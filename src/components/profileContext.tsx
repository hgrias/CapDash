import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";
import React, { createContext } from "react";
import { api } from "~/utils/api";

type RouterOutput = inferRouterOutputs<AppRouter>;
type profileDataOutputType = RouterOutput["legislator"]["getProfileData"];

interface ProfileContextValue {
  profile: profileDataOutputType;
  isLoading: boolean;
  error?: Error;
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
  // Use getProfileData procedure to populate profile context
  const {
    data: profileData,
    isLoading,
    error,
  } = api.legislator.getProfileData.useQuery(
    {
      legislatorId: legislatorId,
    },
    {
      onSuccess: (data) => {
        console.log("Successfully got profileData for context");
        console.log(data);
      },
      refetchOnWindowFocus: false,
      enabled: !!legislatorId,
    }
  );

  const value: ProfileContextValue = {
    profile: profileData ?? null,
    isLoading,
    // error,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
