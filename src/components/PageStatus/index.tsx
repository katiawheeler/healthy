import React from 'react'
import {css, cx} from '@emotion/css'
import type {RowMessages} from '../../types'

const DEFAULT_MESSAGES = {
  ERROR: 'We are currently experiencing outages with our services. Stay tuned!',
  OPERATIONAL: 'All services operational!',
}

export type PageStatusProps = {
  hasError: boolean
  messages?: RowMessages
}

export function PageStatus({hasError, messages}: PageStatusProps) {
  const errorMessage = messages?.error || DEFAULT_MESSAGES.ERROR
  const operationalMessage =
    messages?.operational || DEFAULT_MESSAGES.OPERATIONAL

  return (
    <div
      className={cx(bannerStyles, hasError ? 'error' : undefined)}
      data-testid="banner"
    >
      {hasError ? errorMessage : operationalMessage}
    </div>
  )
}

const bannerStyles = css({
  padding: '15px',
  borderRadius: '4px',
  fontSize: '20px',
  fontFamily: 'inherit',
  backgroundColor: '#2ecc71',
  color: 'white',
  marginBottom: '60px',

  '&.error': {
    backgroundColor: '#ef5350',
  },
})

export default PageStatus
