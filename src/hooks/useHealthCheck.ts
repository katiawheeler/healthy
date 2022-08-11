import {useMemo, useState} from 'react'
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
  const [apisWithErrors, setApisWithErrors] = useState<ApiResponse[]>([])

  useInterval(async () => {
    await Promise.resolve(
      apis.forEach(async api => {
        await fetch(api.endpoint).then(response => {
          const cleanedApiList = apisWithErrors.filter(
            apiWithError => apiWithError.api.endpoint !== api.endpoint
          )

          if (response.ok) {
            // remove api from list of apis with errors if it's back up
            setApisWithErrors(cleanedApiList)

            // if it was the only api with an error, set pageHasError to false
            if (cleanedApiList.length === 0) {
              setPageHasError(false)
            }

            return
          }

          const faultyApi = {api, response, hasError: true}
          setApisWithErrors([...cleanedApiList, faultyApi])
          onError(faultyApi)
          setPageHasError(true)
        })
      })
    )
  }, interval)

  return useMemo(() => ({pageHasError, apisWithErrors}), [
    pageHasError,
    apisWithErrors,
  ])
}

export default useHealthCheck
