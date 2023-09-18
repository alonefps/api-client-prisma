export type Response = {
  message: string;
  client?: Client | Client[];
};

export type Client = {
  id?: string;
  name: string;
  number: string;
  address: string;
};
