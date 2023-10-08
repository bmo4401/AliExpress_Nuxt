export type Product = {
  id: number;
  title: string;
  description: string;
  url: string;
  price: number;
};

export type Address = {
  data: {
    name: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
  };
};

export type Error = {
  type: string;
  message: string;
};
