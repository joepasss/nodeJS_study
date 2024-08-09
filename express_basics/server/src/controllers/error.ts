import { LogFlags, LogInterface } from "../types/log";
import path from "path";
import fs from "fs";
import { rootDir } from "../utils/path";

const logFilePath = path.join(rootDir, "src", "data", "logs.json");

const logger = (message: string, flag: LogFlags) => {
  let logs: LogInterface[] = [];

  fs.readFile(logFilePath, "utf-8", (err, data) => {
    if (!err && data) {
      try {
        logs = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing logs.json:", parseErr);
      }
    }
  });

  logs.push({
    date: new Date().toISOString(),
    message,
    flag,
  });

  fs.writeFile(
    logFilePath,
    JSON.stringify(logs, null, 2),
    "utf-8",
    (writeErr) => {
      if (writeErr) {
        console.error("Error writing to logs.json");
      }
    }
  );
};

export { logger };
