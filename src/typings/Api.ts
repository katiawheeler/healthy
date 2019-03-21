export interface Api {
  /** Name of the API - to be displayed in the banner */
  name: string;
  /** Endpoint of the API to ping */
  endpoint: string;
  /** Custom message to be displayed when there's an error */
  message?: string;
}

export interface Response {
  /** HTTP Error Code */
  code: number;
  /** Status message */
  message: string;
}

export interface ApiWithResponse {
  api: Api;
  response: Response;
}
