export interface Api {
  /** Name of the API - to be displayed in the banner */
  name: string
  /** Endpoint of the API to ping */
  endpoint: string
  /** Custom message to be displayed when there's an error */
  message?: string
}

export interface Response {
  status: number
  statusText: string
}

export interface ApiResponse {
  api: Api
  response?: Response
  hasError?: boolean
}

export interface BannerMessages {
  singleError?: string
  multipleErrors?: string
}

export interface RowMessages {
  error?: string
  operational?: string
}

export interface StatusPageMessages extends RowMessages {}

export interface Messages {
  banner?: BannerMessages
  row?: RowMessages
  statusPage?: StatusPageMessages
}
