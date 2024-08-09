export type LogFlags = "ERROR" | "CREATE" | "UPDATE" | "DELETE";

export interface LogInterface {
  date: string;
  message: string;
  flag: LogFlags;
}
