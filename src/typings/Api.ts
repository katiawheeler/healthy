export interface Api {
  name: string;
  endpoint: string;
  options?: {
    message: string;
  };
}

export interface Response {
  code: number;
  message: string;
}

export interface ApiWithResponse {
  api: Api;
  response: Response;
}
