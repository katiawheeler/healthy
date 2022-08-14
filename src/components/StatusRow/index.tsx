import {css, cx} from '@emotion/css'
import React from 'react'
import {RowMessages} from '../../types'

const DEFAULT_MESSAGES = {
  ERROR: 'Service Interruption',
  OPERATIONAL: 'Operational',
}

export type StatusRowProps = {
  name: string
  hasError: boolean
  className?: string
  messages?: RowMessages
}

export function StatusRow({
  name,
  hasError,
  className = '',
  messages,
}: StatusRowProps) {
  const errorMessage = messages?.error || DEFAULT_MESSAGES.ERROR
  const operationalMessage =
    messages?.operational || DEFAULT_MESSAGES.OPERATIONAL

  return (
    <div className={cx(rowStyles, className)} data-testid="row">
      <div className={infoStyles}>
        <h4>{name}</h4>
      </div>
      <div className={statusStyles}>
        <span className={cx(indicatorStyles, hasError ? 'error' : 'ok')}>
          {hasError ? errorMessage : operationalMessage}
        </span>
      </div>
    </div>
  )
}

const rowStyles = css({
  color: '#3d464d',
  padding: '10px 20px',
  display: 'flex',
  fontFamily: 'inherit',
  alignItems: 'center',
  border: '1px solid #e0e0e0',
  borderTop: 'none',

  '&:last-child': {
    borderRadius: '0 0 4px 4px',
  },

  '&.first': {
    borderRadius: '4px 4px 0 0',
    borderTop: '1px solid #e0e0e0 !important',
  },
})

const infoStyles = css({
  flex: '2',
  '& h4': {
    margin: '5px',
    textAlign: 'left',
  },
})

const statusStyles = css({
  textAlign: 'right',
  flex: '1',
})

const indicatorStyles = css({
  '&.ok': {
    color: '#2ecc71',
  },
  '&.error': {
    color: '#ef5350',
  },
})

export default StatusRow
