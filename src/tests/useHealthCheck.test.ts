import {renderHook} from '@testing-library/react-hooks'
import {useHealthCheck} from '../hooks/useHealthCheck'
import constants from './constants'

const {badApis} = constants

jest.useFakeTimers()
describe('useHealthCheck', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('when apis have errors', () => {
    const onErrorSpy = jest.fn()

    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve(
          new Response('', {
            status: 404,
          })
        )
      )
    })

    it('should handle the errored APIs accordingly', async () => {
      const {result, waitForNextUpdate} = renderHook(() =>
        useHealthCheck({
          apis: badApis,
          interval: 500,
          onError: onErrorSpy,
        })
      )

      jest.advanceTimersToNextTimer()
      await waitForNextUpdate()

      expect(result.current.pageHasError).toBeTruthy()
      expect(result.current.apisWithErrors.length).toBe(2)
      expect(onErrorSpy).toHaveBeenCalledTimes(2)

      global.fetch = jest.fn(() =>
        Promise.resolve(
          new Response('', {
            status: 200,
          })
        )
      )

      jest.advanceTimersToNextTimer()
      await waitForNextUpdate()

      expect(result.current.pageHasError).toBeFalsy()
      expect(result.current.apisWithErrors.length).toBe(0)
    })
  })
})
