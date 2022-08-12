import React from 'react'
import {render, waitFor, cleanup} from '@testing-library/react'
import Healthy, {Props} from '.'

const goodEndpoint = 'https://httpstat.us/200'
const badEndpoint = 'https://httpstat.us/404'

afterEach(cleanup)

describe('src/components/Healthy', () => {
  const goodConfig: Props['config'] = {
    apis: [
      {
        endpoint: goodEndpoint,
        name: 'Test Api',
      },
    ],
    interval: 1,
  }

  const badConfig: Props['config'] = {
    apis: [
      {
        endpoint: badEndpoint,
        name: 'Bad Api',
      },
    ],
  }

  describe('closeable', () => {
    it('should close when clicked', async () => {
      const {getByTestId} = render(<Healthy config={{...badConfig, closeable: true}} />)
      const btn = await waitFor(() => getByTestId('close'))

      expect(btn).toBeInTheDocument()
      btn.click()
      expect(btn).not.toBeInTheDocument()
    })
  })

  describe('onError', () => {
    it('should call the prop onError', async () => {
      const onErrorSpy = jest.fn()
      render(<Healthy config={{...badConfig, onError: onErrorSpy}} />)

      const expected = [
        {
          endpoint: 'https://httpstat.us/404',
          name: 'Bad Api',
        },
        {
          code: 404,
          message: 'Not Found',
        },
      ]

      await waitFor(() => expect(onErrorSpy).toHaveBeenCalledWith(...expected))
    })
  })
})
