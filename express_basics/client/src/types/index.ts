export interface ProductDataInterface {
  id: string;
  title: string;
  price: string;
  image: {
    url: string;
    filename: string;
  };
}

export interface ErrorResponse {
  message: string;
}

export interface ResponseInterface<T> {
  error: ErrorResponse | undefined;
  data: T | undefined;
}
