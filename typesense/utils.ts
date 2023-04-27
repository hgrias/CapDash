import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import Typesense from "typesense";
import { env } from "~/env.mjs";

// Typesense client
export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: env.TYPESENSE_HOSTNAME, // For Typesense Cloud use xxx.a1.typesense.net
      port: 8108, // For Typesense Cloud use 443
      protocol: "http", // For Typesense Cloud use https
    },
  ],
  apiKey: env.TYPESENSE_API_KEY,
  connectionTimeoutSeconds: 2,
});

// Create a search adapter for react-instantsearch-hooks-web components
export function createTypesenseSearchAdapter(additionalSearchParameters = {}) {
  const typesenseSearchAdapter = new TypesenseInstantsearchAdapter({
    server: {
      apiKey: env.TYPESENSE_API_KEY,
      nodes: [
        {
          host: env.TYPESENSE_HOSTNAME,
          port: 8108,
          protocol: "http",
        },
      ],
    },
    additionalSearchParameters: {
      query_by: "",
      query_by_weights: "",
      sort_by: "",
      include_fields: "",
      ...additionalSearchParameters, // merge any additional parameters passed in
    },
  });
  return typesenseSearchAdapter;
}
