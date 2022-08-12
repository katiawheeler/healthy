import {useEffect, useMemo, useState} from 'react'
import { useSet } from 'react-use'

import {Api, ApiResponse} from '../types'
import useInterval from './useInterval'

const noop = () => {}

interface HealthCheck {
  apis: Api[]
  interval?: number
  onError?: (api: ApiResponse) => void
}

const useHealthCheck = ({
  apis,
  interval = 30000,
  onError = noop,
}: HealthCheck) => {
  const [pageHasError, setPageHasError] = useState<boolean>(false)
  const [apisWithErrors, { add, has, remove }] = useSet<Api>(new Set())

  useInterval(async () => {
    await Promise.resolve(
      apis.forEach(async api => {
        await fetch(api.endpoint).then(response => {
          // if response ok, remove from apisWithErrors
          if(response.ok) {
            remove(api)
          }
          // if not, add to apisWithErrors if it doesn't already exist
          else if(!has(api)) {
            add(api)
            onError({api, response, hasError: true})
          }
        })
      })
    )
  }, interval)

  useEffect(() => {
    if(apisWithErrors.size > 0) {
      setPageHasError(true)
    } else {
      setPageHasError(false)
    }
  }, [apisWithErrors])

  return useMemo(() => ({pageHasError, apisWithErrors }), [
    pageHasError,
    apisWithErrors,
  ])
}

export default useHealthCheck
