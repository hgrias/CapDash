import type { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import Typesense from "typesense";

const client = new Typesense.Client({
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
    { name: "firstName", type: "string", sort: true },
    { name: "lastName", type: "string", sort: true },
    { name: "district", type: "string" },
    { name: "party", type: "string", facet: true },
    { name: "role", type: "string" },
  ],
  // default_sorting_field: "lastName",
};

const noteSchema: CollectionCreateSchema = {
  name: "Note",
  fields: [
    { name: "id", type: "string" },
    { name: "content", type: "string" },
    { name: "createdBy", type: "string" },
  ],
};

void client
  .collections()
  .create(legislatorSchema)
  .then((data) => {
    console.log(data);
  });

void client
  .collections()
  .create(noteSchema)
  .then((data) => {
    console.log(data);
  });
