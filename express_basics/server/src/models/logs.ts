type FlagType = "ERROR" | "CREATE" | "DELETE" | "UPDATE";

const logger = (message: string, flag: FlagType) => {
  console.log("LOGGING_FUNCTION");
  console.log(`${flag}: ${message}`);
};

export { logger };
