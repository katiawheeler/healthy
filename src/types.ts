export interface Api {
  /** Name of the API - to be displayed in the banner */
  name: string
  /** Endpoint of the API to ping */
  endpoint: string
}

export interface Response {
  status: number
  statusText: string
}

export interface ApiResponse {
  api: Api
  response?: Response
}

export interface BannerMessages {
  singleError?: string
  multipleErrors?: string
}

export interface RowMessages {
  error?: string
  operational?: string
}

export type StatusPageMessages = RowMessages

export interface Messages {
  banner?: BannerMessages
  row?: RowMessages
  statusPage?: StatusPageMessages
}
