import React from 'react'
import {render, waitFor, cleanup, screen} from '@testing-library/react'
import Healthy, {Props} from '.'

const goodEndpoint = 'https://httpstat.us/200'
const badEndpoint = 'https://httpstat.us/404'

const waitForOptions = { interval: 1500 }
describe('src/components/Healthy', () => {
  const goodConfig: Props['config'] = {
    apis: [
      {
        endpoint: goodEndpoint,
        name: 'Test Api',
      },
    ],
    interval: 500,
  }

  const badConfig: Props['config'] = {
    apis: [
      {
        endpoint: badEndpoint,
        name: 'Bad Api',
      },
    ],
    interval: 500,
  }

  describe('<Healthy />', () => {
    afterEach(() => {
      jest.restoreAllMocks()
      cleanup()
    })

    it('should not render the banner if no issues are found', async () => {
      render(<Healthy config={goodConfig} />)

      await waitFor(() => {
        expect(screen.queryByTestId('BANNER')).toBeNull()
      }, waitForOptions)
    })

    it('should render the banner if issues are found', async () => {
      render(<Healthy config={badConfig} />)

      await waitFor(() => {
        expect(screen.queryByTestId('BANNER')).not.toBeNull()
      }, waitForOptions)
    })

    it('should render a close button if closeable', async () => {
      render(<Healthy config={{...badConfig, closeable: true}} />)

      await waitFor(() => {
        expect(screen.queryByTestId('CLOSE_BUTTON')).not.toBeNull()
      }, waitForOptions)
    })

    it.only('should call onError with the correct api if an api has an error', async () => {
      const onErrorSpy = jest.fn()
      render(<Healthy config={{...badConfig, onError: onErrorSpy}} />)

      await waitFor(() => {
        expect(onErrorSpy).toHaveBeenCalledTimes(1)
      }, waitForOptions)
    })
  })
})
