import { type CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import Typesense from "typesense";

// Typesense client
const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: "127.0.0.1", // For Typesense Cloud use xxx.a1.typesense.net
      port: 8108, // For Typesense Cloud use 443
      protocol: "http", // For Typesense Cloud use https
    },
  ],
  apiKey: "xyz",
  connectionTimeoutSeconds: 2,
});

const legislatorSchema: CollectionCreateSchema = {
  name: "Legislator",
  fields: [
    { name: "id", type: "string" },
    { name: "organizationId", type: "string" },
    { name: "firstName", type: "string", sort: true },
    { name: "lastName", type: "string", sort: true },
    { name: "district", type: "string" },
    { name: "party", type: "string", facet: true },
    { name: "role", type: "string", facet: true },
  ],
  // default_sorting_field: "lastName",
};

void typesenseClient
  .collections()
  .create(legislatorSchema)
  .then((data) => {
    console.log("Typesense collections created.");
  });
