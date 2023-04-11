import React, { createContext, useContext, useState } from "react";
import { Staffer, Note, InteractionType, Tag } from "@prisma/client";
import { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

// Define some types from our router/procedure outputs
type legislatorQueryType = RouterOutputs["legislator"]["byId"];

// Manually define these types
type InteractionsWithUser = {
  id: number;
  type: InteractionType;
  content: string;
  createdAt: Date;
  noteId: number | null;
  sessionId: number;
  method: string;
  tags: Tag[];
  user: {
    id: string;
    name: string;
  };
}[];

type NotesWithUser = (Note & {
  user: {
    id: string;
    name: string;
    image: string | null;
  };
})[];

interface ProfileContextValue {
  legislator: legislatorQueryType;
  notes: NotesWithUser;
  interactions: InteractionsWithUser;
  staffers: Staffer[];
  error?: Error;
  notesQuery: any; // Can't find type of useInfiniteQuery output??
  interactionsQuery: any;
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
  const [interactions, setInteractions] = useState<InteractionsWithUser>([]);
  const [staffers, setStaffers] = useState<Staffer[]>([]);
  const [notes, setNotes] = useState<NotesWithUser>([]);

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
          const newNotes = data.pages.flatMap((page) => page?.notes ?? []);
          setNotes(newNotes);
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

  const interactionsQuery = api.interaction.getForLegislator.useInfiniteQuery(
    {
      legislatorId: legislatorId,
      limit: 10,
    },
    {
      enabled: !!legislatorId,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data.pages) {
          const newInteractions = data.pages.flatMap(
            (page) => page?.interactions ?? []
          );
          setInteractions(newInteractions);
        }
      },
      getNextPageParam: (nextPage) => {
        return nextPage?.nextCursor;
      },
    }
  );

  const value: ProfileContextValue = {
    legislator: legislator,
    notes: notes,
    interactions: interactions,
    staffers: staffers,
    notesQuery: notesQuery,
    interactionsQuery: interactionsQuery,
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
