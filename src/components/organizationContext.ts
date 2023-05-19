import React, { createContext, useContext, useState, useEffect } from "react";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import type { LegislativeSession, Tag } from "@prisma/client";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

// Import types from tRPC router outputs
type orgInfoQueryType = RouterOutputs["organization"]["info"];

// Provider Value Props
interface OrganizationContextValue {
  organization: orgInfoQueryType;
  orgTags: Tag[] | undefined;
  orgSessions: LegislativeSession[] | undefined;
  orgActiveSession: LegislativeSession | undefined;
  scopedSearchApiKey: string | undefined;
}

const OrganizationContext = createContext<OrganizationContextValue | null>(
  null
);

interface OrganizationProviderProps {
  children: React.ReactNode;
}

export function OrganizationProvider({ children }: OrganizationProviderProps) {
  const [orgSessions, setOrgSessions] = useState<LegislativeSession[]>();
  const [orgTags, setOrgTags] = useState<Tag[]>();
  const [orgInfo, setOrgInfo] = useState<orgInfoQueryType>();
  const [scopedSearchApiKey, setScopedSearchApiKey] = useState<string>();
  const [orgActiveSession, setOrgActiveSession] =
    useState<LegislativeSession>();

  // Get the user's organization ID from session context data
  const { data: session } = useSession();
  // Only grab context data once organization ID is valid
  const organizationId = session?.user?.organizationId ?? undefined;

  // TODO: Could probably get all these queries into 1 then extract to state
  api.organization.info.useQuery(undefined, {
    enabled: !!organizationId,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setOrgInfo(data);
    },
  });

  api.organization.tags.useQuery(undefined, {
    enabled: !!organizationId,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const [{ tags } = { tags: [] }] = data ?? [];
      setOrgTags(tags);
    },
  });

  api.organization.sessions.useQuery(undefined, {
    enabled: !!organizationId,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      const [{ sessions } = { sessions: [] }] = data ?? [];
      setOrgSessions(sessions);
    },
  });

  // Generate the scoped API key for Typesense
  api.search.generateScopedApiKey.useQuery(undefined, {
    enabled: !!organizationId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onSuccess: (data) => {
      if (data) {
        setScopedSearchApiKey(data);
      }
    },
  });

  // Set the active session from the sessions list
  useEffect(() => {
    if (orgSessions) {
      const activeSession = orgSessions.find((session) => session.active);
      setOrgActiveSession(activeSession);
    }
  }, [orgSessions]);

  const value: OrganizationContextValue = {
    organization: orgInfo,
    orgTags: orgTags,
    orgSessions: orgSessions,
    orgActiveSession: orgActiveSession,
    scopedSearchApiKey: scopedSearchApiKey,
  };

  // !? Had to use createElement instead of fragment syntax bc it couldnt recognize OrganizationContext in the fragment (no idea why)
  return React.createElement(
    OrganizationContext.Provider,
    { value: value },
    children
  );
}

// Create a hook to use this new context
export function useOrganizationContext(): OrganizationContextValue {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganizationContext must be used within a OrganizationProvider component"
    );
  }
  return context;
}
