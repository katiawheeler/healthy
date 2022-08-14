export interface Api {
  name: string
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
