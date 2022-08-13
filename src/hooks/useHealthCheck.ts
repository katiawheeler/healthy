import {Console} from 'console'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useSet} from 'react-use'

import {Api, ApiResponse} from '../types'
import useInterval from './useInterval'

interface HealthCheck {
  apis: Api[]
  interval?: number
  onError?: (api: ApiResponse) => void
}

export interface HealthCheckReturn {
  apisWithErrors: Set<Api>
  pageHasError: boolean
}

const useHealthCheck = ({
  apis,
  interval = 30000,
  onError,
}: HealthCheck): HealthCheckReturn => {
  const [pageHasError, setPageHasError] = useState<boolean>(false)
  const [apisWithErrors, {add, has, remove}] = useSet<Api>(new Set())

  const fetchData = useCallback(async () => {
    apis.forEach(api => {
      makeCall(api).then(response => {
        if (response.ok && has(api)) {
          remove(api)
        } else if (!response.ok && !has(api)) {
          add(api)
          onError?.({api, response})
        }
      })
    })
  }, [apis, onError, add, has, remove])

  useInterval(fetchData, interval)

  useEffect(() => {
    if (apisWithErrors.size > 0) {
      setPageHasError(true)
    } else {
      setPageHasError(false)
    }
  }, [apisWithErrors])

  return useMemo(() => ({pageHasError, apisWithErrors}), [
    pageHasError,
    apisWithErrors,
  ])
}

const makeCall = async (api: Api) => {
  return await fetch(api.endpoint)
}

export default useHealthCheck
