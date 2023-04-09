import React, { createContext, useContext, useState } from "react";
import { Interaction, Staffer, Note } from "@prisma/client";
import { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

// Define some types from our router/procedure outputs
type notesQueryType = RouterOutputs["note"]["listForLegislator"];
type legislatorQueryType = RouterOutputs["legislator"]["byId"];
type NoteWithUser = Note & {
  user: {
    name: string;
    image: string | null;
  };
};
type NotesArray = NoteWithUser[];

interface ProfileContextValue {
  legislator: legislatorQueryType;
  notes: NotesArray;
  interactions: Interaction[];
  staffers: Staffer[];
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
  const [legislator, setLegislator] = useState<legislatorQueryType>();
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [staffers, setStaffers] = useState<Staffer[]>([]);
  const [notes, setNotes] = useState<NotesArray>([]);

  const legislatorQuery = api.legislator.byId.useQuery(
    {
      legislatorId: legislatorId,
    },
    {
      enabled: !!legislatorId,
      onSuccess: (legislator) => {
        setLegislator(legislator);
      },
      refetchOnWindowFocus: false,
    }
  );

  const notesQuery = api.note.listForLegislator.useInfiniteQuery(
    {
      legislatorId: legislatorId,
      limit: 5,
    },
    {
      enabled: !!legislatorId,
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

  const stafferQuery = api.staffer.list.useQuery(
    {
      legislatorId: legislatorId,
    },
    {
      enabled: !!legislatorId,
      refetchOnWindowFocus: false,
      onSuccess: (staffers) => {
        if (staffers) {
          setStaffers(staffers);
        }
      },
    }
  );

  const value: ProfileContextValue = {
    legislator: legislator,
    notes: notes,
    interactions: interactions,
    staffers: staffers,
    notesQuery: notesQuery,
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
