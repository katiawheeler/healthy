import React, {useState, useCallback, useMemo, useEffect} from 'react'
import {css, cx} from '@emotion/css'

import useHealthCheck from '../../hooks/useHealthCheck'
import {Api, ApiResponse, BannerMessages } from '../../types'

interface Props {
  config: HealthyConfig
}

export type HealthyConfig = {
  /** An array of API objects */
  apis: Api[]
  /** A callback that's called after the component handles the error, for additional error handling */
  onError?: (api: ApiResponse) => void
  /** The interval at which to call the APIs in milliseconds; default is 30 seconds (30000) */
  interval?: number
  /** CSS class names to assign to the banner, banner content, and close button */
  classes?: {
    banner?: string
    content?: string
    closeButton?: string
  }
  messages?: BannerMessages
  /** Whether or not to show a close icon - default is false */
  closeable?: boolean
}

export function Healthy({config}: Props) {
  const {
    apis,
    onError,
    interval = undefined,
    classes = undefined,
    closeable = false,
    messages,
  } = config
  const [showBanner, setShowBanner] = useState(false)

  const {pageHasError, apisWithErrors} = useHealthCheck({
    apis,
    interval,
    onError,
  })

  useEffect(() => {
    setShowBanner(pageHasError)
  }, [pageHasError])

  const closeButton = useMemo(
    () =>
      closeable ? (
        <button
          className={cx(closeButtonStyles, classes?.closeButton)}
          onClick={() => setShowBanner(false)}
        >
          &times;
        </button>
      ) : null,
    [closeable, classes?.closeButton]
  )

  const determineMessage = useCallback(() => {
    if (!apisWithErrors.size) return

    // single issue
    if (apisWithErrors.size === 1) {
      const downApi = apisWithErrors.values().next().value
      const defaultMessage = `We are currently experiencing issues with our ${downApi.name} service`

      return messages?.singleError || defaultMessage
    }

    // multiple issues
    return (
      messages?.multipleErrors ||
      'We are currently experiencing issues with our services'
    )
  }, [messages, apisWithErrors])

  return showBanner ? (
    <div className={cx(bannerWrapperStyles, classes?.banner)}>
      <div className={cx(bannerContentStyles, classes?.content)}>
        <span>{determineMessage()}</span>
      </div>
      {closeButton}
    </div>
  ) : null
}

const bannerWrapperStyles = css({
  color: 'white',
  backgroundColor: '#ef5350',
  width: '100%',
  position: 'relative',
})

const bannerContentStyles = css({
  padding: '20px',
  maxWidth: '1000px',
  fontSize: '16px',
  fontFamily: 'inherit',
  margin: '0 auto',
  textAlign: 'center',
})

const closeButtonStyles = css({
  position: 'absolute',
  top: '30%',
  right: '30px',
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  boxShadow: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  fontFamily: 'inherit',
  '&:hover': {
    background: '#e53935',
  },
  '&:focus, &:active': {
    outline: 'none',
  },
})

export default Healthy
