import React from 'react'
import {render, waitFor, cleanup, screen} from '@testing-library/react'
import Healthy from '../components/Healthy'
import constants from './constants'

const {goodApis, badApis, waitForOptions} = constants

const goodConfig = {
  apis: goodApis,
  interval: 100,
}

const badConfig = {
  apis: badApis,
  interval: 100,
}

describe('src/components/Healthy', () => {
  describe('<Healthy />', () => {
    afterEach(() => {
      jest.restoreAllMocks()
      cleanup()
    })

    it('should not render the banner if no issues are found', async () => {
      render(<Healthy config={goodConfig} />)

      await waitFor(() => {
        expect(screen.queryByTestId('BANNER')).not.toBeInTheDocument()
      }, waitForOptions)
    })

    it('should render the banner if issues are found', async () => {
      render(<Healthy config={badConfig} />)

      await waitFor(() => {
        expect(screen.queryByTestId('BANNER')).toBeInTheDocument()
      }, waitForOptions)
    })

    it('should render a close button if closeable', async () => {
      render(<Healthy config={{...badConfig, closeable: true}} />)

      await waitFor(() => {
        expect(screen.queryByTestId('CLOSE_BUTTON')).toBeInTheDocument()
      }, waitForOptions)
    })

    it('should call onError with the correct api if an api has an error', async () => {
      const onErrorSpy = jest.fn()
      render(
        <Healthy
          config={{
            apis: [badApis[0], goodApis[0]],
            interval: 100,
            onError: onErrorSpy,
          }}
        />
      )

      await waitFor(() => {
        expect(onErrorSpy).toHaveBeenCalledTimes(1)
      }, waitForOptions)
    })
  })
})
