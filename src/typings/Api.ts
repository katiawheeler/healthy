export type Api = {
  name: string;
  endpoint: string;
  options?: {
    message: string;
  };
}

export type Response = {
  code: number;
  message: string;
};

export interface ApiWithResponse {
  api: Api;
  response: Response;
}
