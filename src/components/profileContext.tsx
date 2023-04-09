import React, { createContext, useContext, useState } from "react";
import { Interaction, Staffer } from "@prisma/client";
import { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

// Define some types from our router/procedure outputs
type profileDataOutputType = RouterOutputs["legislator"]["getProfileData"];
type profileNotesOutputType = RouterOutputs["note"]["getAllForLegislator"];

interface ProfileContextValue {
  // profile contains all data - I don't want it to but I don't know how to extract only the top level data efficiently
  profile: profileDataOutputType;
  // These initially come from profile, but then keep their own state for updates
  notes: profileNotesOutputType;
  interactions: Interaction[];
  staffers: Staffer[];
  isLoading: boolean;
  error?: Error;
  refetchProfileNotes: () => void;
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
  const [shouldRefetchNotes, setShouldRefetchNotes] = useState<boolean>(false);
  const [notes, setNotes] = useState<profileNotesOutputType>([]);
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

  // Set when we should refetch notes for profile
  const refetchProfileNotes = () => {
    setShouldRefetchNotes(true);
  };

  // Get profile notes for refetch
  api.note.getAllForLegislator.useQuery(
    {
      legislatorId: legislatorId,
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setNotes(data);
        setShouldRefetchNotes(false);
      },
      onError: (error) => {
        console.error(error);
        setShouldRefetchNotes(false);
      },
      enabled: shouldRefetchNotes,
    }
  );

  const value: ProfileContextValue = {
    profile: profileData ?? null,
    notes: notes,
    interactions: interactions,
    staffers: staffers,
    refetchProfileNotes,
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
