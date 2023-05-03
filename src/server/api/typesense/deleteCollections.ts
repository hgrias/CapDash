import { type CollectionCreateSchema } from "typesense/lib/Typesense/Collections";
import Typesense from "typesense";

// TODO: Figure out how to use this abstracted typsense util with env var
// import { typesenseClient } from "./utils";

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

void typesenseClient
  .collections("Legislator")
  .delete()
  .then((data) => {
    console.log("Typesense collections deleted.");
  });
