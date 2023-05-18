import { type ConfigurationOptions } from "typesense/lib/Typesense/Configuration";

// make it easier to conditionally add Tailwind CSS classes with shadcn-ui
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "~/env.mjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to generate the Typesense Server Config with a scoped Search API Key
export function assembleTypesenseServerConfig(scopedSearchApiKey: string) {
  const TYPESENSE_SERVER_CONFIG: ConfigurationOptions = {
    apiKey: scopedSearchApiKey,
    nodes: [
      {
        host: env.NEXT_PUBLIC_TYPESENSE_HOST,
        port: parseInt(env.NEXT_PUBLIC_TYPESENSE_PORT),
        protocol: env.NEXT_PUBLIC_TYPESENSE_PROTOCOL,
      },
    ],
    numRetries: 8,
    connectionTimeoutSeconds: 1,
  };

  return TYPESENSE_SERVER_CONFIG;
}
