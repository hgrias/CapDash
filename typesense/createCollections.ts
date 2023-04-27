import { type CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import { typesenseClient } from "./utils";

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

void typesenseClient
  .collections()
  .create(legislatorSchema)
  .then((data) => {
    console.log(data);
  });

void typesenseClient
  .collections()
  .create(noteSchema)
  .then((data) => {
    console.log(data);
  });
