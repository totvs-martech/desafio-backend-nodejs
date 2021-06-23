export interface Filter {
  page: String;
  limit: number;
}

export interface HttpRequest {
  body: any;
  params: any;
  filter: Filter;
  query: String;
  headers: Array<any>;
  cache: any;
  logger: any;
  auth: String;
  method: String;
  url: String;
  io: any;
}