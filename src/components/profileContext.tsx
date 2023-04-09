import React, { createContext, useContext, useState } from "react";
import { Interaction, Staffer, Note } from "@prisma/client";
import { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

// Define some types from our router/procedure outputs
type profileDataOutputType = RouterOutputs["legislator"]["getProfileData"];
type notesQueryType = RouterOutputs["note"]["listForLegislator"];
type NoteWithUser = Note & {
  user: {
    name: string;
    image: string | null;
  };
};
type NotesArray = NoteWithUser[];

interface ProfileContextValue {
  // profile contains all data - I don't want it to but I don't know how to extract only the top level data efficiently
  profile: profileDataOutputType;
  // These initially come from profile, but then keep their own state for updates
  notes: NotesArray;
  interactions: Interaction[];
  staffers: Staffer[];
  isLoading: boolean;
  error?: Error;
  notesQuery: any; // Can't find type of useInfiniteQuery output??
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

interface ProfileProviderProps {
  legislatorId: string;
  children: React.ReactNode;
}

export function ProfileProvider({
  legislatorId,
  children,
}: ProfileProviderProps) {
  const [notes, setNotes] = useState<NotesArray>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [staffers, setStaffers] = useState<Staffer[]>([]);

  // Use getProfileData procedure to populate profile context
  const { data: profileData, isLoading } =
    api.legislator.getProfileData.useQuery(
      {
        legislatorId: legislatorId,
      },
      {
        onSuccess: (data) => {
          if (data) {
            setNotes(data.notes);
            setInteractions(data.interactions);
            setStaffers(data.staffers);
          }
        },
        refetchOnWindowFocus: false,
        enabled: !!legislatorId,
      }
    );

  const notesQuery = api.note.listForLegislator.useInfiniteQuery(
    {
      legislatorId: legislatorId,
      limit: 5,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data.pages) {
          setNotes(data.pages.flatMap((page) => page!.notes));
        }
      },
      getNextPageParam: (nextPage) => {
        return nextPage?.nextCursor;
      },
    }
  );

  const value: ProfileContextValue = {
    profile: profileData ?? null,
    notes: notes,
    interactions: interactions,
    staffers: staffers,
    notesQuery: notesQuery,
    isLoading,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

// Create a hook for use to use this new context
export function useProfileContext(): ProfileContextValue {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfileContext must be used within a ProfileProvider component"
    );
  }
  return context;
}
