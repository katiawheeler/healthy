import {css} from '@emotion/css'
import React from 'react'
import {PageStatus, StatusRow} from '../../components'
import {useHealthCheck} from '../../hooks/useHealthCheck'
import type {Api, ApiResponse, Messages} from '../../types'

export type StatusPageConfig = {
  apis: Api[]
  interval?: number
  messages?: Pick<Messages, 'row' | 'statusPage'>
  onError?: (api: ApiResponse) => void
}

export type StatusPageProps = {
  config: StatusPageConfig
}

export function StatusPage({config}: StatusPageProps) {
  const {apisWithErrors: apiWithErrorsArray, pageHasError} = useHealthCheck({
    apis: config.apis,
    interval: config.interval,
    onError: config.onError,
  })
  const apisWithErrors = new Set(apiWithErrorsArray)

  return (
    <div className={containerStyles}>
      <PageStatus
        hasError={pageHasError}
        messages={config.messages?.statusPage}
      />
      {config.apis.map((api, i) => {
        const apiHasError = apisWithErrors.has(api)

        return (
          <StatusRow
            key={api.name + api.endpoint}
            name={api.name}
            hasError={apiHasError}
            className={i === 0 ? 'first' : ''}
            messages={config.messages?.row}
          />
        )
      })}
    </div>
  )
}

const containerStyles = css({
  width: '100%',
  maxWidth: '800px',
  margin: '60px auto',
})

export default StatusPage
