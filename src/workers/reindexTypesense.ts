// src/workers/task.ts
import { setTimeout } from "timers/promises";

function main() {
  while (true) {
    console.log("HELLo!");
    void setTimeout(5000);
  }
}

main();
