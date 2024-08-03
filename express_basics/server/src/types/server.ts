import { ProductDataInterface } from "./product";

export interface ErrorResponse {
  message: string;
}

export type DataResponse = ProductDataInterface[] | undefined;

export interface ResponseInterface {
  error: ErrorResponse | undefined;
  data: DataResponse;
}
