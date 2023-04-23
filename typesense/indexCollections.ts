import Typesense from "typesense";
import fs from "fs/promises";

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

async function importData() {
  const legislatorsInFile = await fs.readFile(
    "typesense/legislatorData.jsonl",
    { encoding: "utf-8" }
  );
  await client
    .collections("legislators")
    .documents()
    .import(legislatorsInFile, { action: "create" });
}

void importData();
