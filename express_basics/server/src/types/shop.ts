export interface ProductDataInterface {
  id: string;
  title: string;
  price: number;
  image: {
    thumb: string;
    filename?: string | undefined;
  };
}
