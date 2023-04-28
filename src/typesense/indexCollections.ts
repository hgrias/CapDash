import { typesenseClient } from "./utils.js";
import fs from "fs/promises";

async function importData() {
  const legislatorsInFile = await fs.readFile(
    "typesense/legislatorData.jsonl",
    { encoding: "utf-8" }
  );
  await typesenseClient
    .collections("legislators")
    .documents()
    .import(legislatorsInFile, { action: "create" });
}

void importData();
