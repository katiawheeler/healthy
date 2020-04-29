import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import Healthy, { HealthyProps, determineMessage } from '.';
import { ApiWithResponse } from '../../typings/Api';

const goodEndpoint = 'https://httpstat.us/200';
const badEndpoint = 'https://httpstat.us/404';

afterEach(cleanup);

describe('determineMessage', () => {
  describe('when there is only one problem child', () => {
    it('should return the correct message', () => {
      const problemChild: ApiWithResponse = {
        api: {
          name: 'Problem',
          endpoint: 'nope'
        },
        response: {
          code: 500,
          message: 'bad'
        }
      }

      const result = determineMessage([problemChild]);
      const expected = `We are currently experiencing issues with our Problem service`;
      expect(result).toBe(expected)
    });

    describe('when a custom message is passed', () => {
      it('should return the custom message', () => {
        const problemChild: ApiWithResponse = {
          api: {
            name: 'Problem',
            endpoint: 'nope',
            message: 'Custom message here'
          },
          response: {
            code: 500,
            message: 'bad'
          }
        }

        const result = determineMessage([problemChild]);
        const expected = `Custom message here`;
        expect(result).toBe(expected)
      })
    })
  });

  describe('when there are multiple problem children', () => {
    it('should return the correct message', () => {
      const problemChildren: ApiWithResponse[] = [
        {
          api: {
            name: 'Problem',
            endpoint: 'nope'
          },
          response: {
            code: 500,
            message: 'bad'
          }
        },
        {
          api: {
            name: 'Problem2',
            endpoint: 'still nope'
          },
          response: {
            code: 500,
            message: 'bad'
          }
        }
      ]

      const result = determineMessage(problemChildren);
      const expected = `We are currently experiencing issues with 2 services`;
      expect(result).toBe(expected)
    });
  });

  describe('when there are no problem children', () => {
    it('should do nothing', () => {
      const result = determineMessage([]);
      expect(result).toBeUndefined();
    })
  });
});

describe('src/components/Healthy', () => {
  const goodProps: HealthyProps = {
    apis: [
      {
        endpoint: goodEndpoint,
        name: 'Test Api',
      },
    ],
  };

  const badProps: HealthyProps = {
    apis: [
      {
        endpoint: badEndpoint,
        name: 'Bad Api',
      },
    ],
  }

  describe('closeable', () => {
    it('should close when clicked', async () => {
      const { getByTestId } = render(<Healthy {...badProps} closeable={true} />)
      const btn = await waitFor(() => getByTestId('close'));

      expect(btn).toBeInTheDocument();
      btn.click();
      expect(btn).not.toBeInTheDocument();
    })
  });

  describe('onError', () => {
    it('should call the prop onError', async () => {
      const onErrorSpy = jest.fn();
      render(<Healthy {...badProps} onError={onErrorSpy} />)

      const expected = [
        {
          endpoint: "https://httpstat.us/404",
          name: "Bad Api"
        },
        {
          code: 404,
          message: "Not Found"
        }
      ];

      await waitFor(() => expect(onErrorSpy).toHaveBeenCalledWith(...expected));
    })
  });
});