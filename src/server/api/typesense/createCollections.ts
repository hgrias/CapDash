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
    { name: "organizationId", type: "string" },
    { name: "firstName", type: "string", sort: true },
    { name: "lastName", type: "string", sort: true },
    { name: "district", type: "string", infix: true },
    { name: "party", type: "string", facet: true },
    { name: "role", type: "string", facet: true },
  ],
  token_separators: ["-"], // So we can query by districts more effectively
};

const noteSchema: CollectionCreateSchema = {
  name: "Note",
  fields: [
    { name: "organizationId", type: "string" },
    { name: "content", type: "string", sort: true },
    { name: "legislatorId", type: "string" },
    {
      name: "legislatorName",
      type: "string",
      searchable: true,
    },
    { name: "tags", type: "string[]", searchable: true },
    { name: "createdById", type: "string" },
    { name: "createdByName", type: "string", searchable: true },
    { name: "createdAt", type: "string", sort: true }, // Need to be converted to unix timestamps
  ],
  default_sorting_field: "createdAt",
};

void typesenseClient
  .collections()
  .create(legislatorSchema)
  .then((data) => {
    console.log("Legislator collection created.");
  });

void typesenseClient
  .collections()
  .create(noteSchema)
  .then((data) => {
    console.log("Note collection created.");
  });
