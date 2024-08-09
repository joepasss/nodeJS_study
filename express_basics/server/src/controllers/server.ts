import { LogInterface } from "../types/log";
import path from "path";
import fs from "fs";
import { rootDir } from "../utils/path";

const logsFilePath = path.join(rootDir, "src", "data", "logs.json");

const getLogs = (): Promise<LogInterface[]> => {
  return new Promise((resolve, _reject) => {
    fs.readFile(logsFilePath, "utf-8", (err, fileContent) => {
      if (err) {
        return resolve([]);
      }

      const logs = JSON.parse(fileContent);
      resolve(logs);
    });
  });
};

export { getLogs };
