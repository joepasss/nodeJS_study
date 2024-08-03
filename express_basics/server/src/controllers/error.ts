import { LogFlags } from "../types/log";

const logger = (message: string, flag: LogFlags) => {
  console.log(`${flag}: ${message}`);
};

export { logger };
