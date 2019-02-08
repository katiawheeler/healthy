import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Healthy, { HealthyProps, HealthyState } from '.';
import { begin } from '../../services/index';
import { Api } from '../../typings/Api';
import { Response } from '../../typings/Response';

jest.mock('../../services/index');

const goodEndpoint = 'https://httpstat.us/200';
const badEndpoint = 'https://httpstat.us/404';

describe('src/components/Healthy', () => {
  describe('componentDidMount', () => {
    it('should call begin', () => {
      const props: HealthyProps = {
        api: [
          {
            name: 'Test Api',
            endpoint: goodEndpoint,
          },
        ],
      };

      shallow(<Healthy {...props} />);
      expect(begin).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleError', () => {
    const api: Api = {
      name: 'Bad Api',
      endpoint: badEndpoint,
    };
    const response: Response = {
      code: 404,
      message: 'Not found',
    };

    const props: HealthyProps = {
      api: [api],
      onError: jest.fn(),
    };

    describe('when the problemChild is not currently in state', () => {
      it('should add the faulty api into problemChildren', async () => {
        const component = shallow<Healthy>(<Healthy {...props} />);
        expect(component.state('problemChildren')).toEqual([]);
        await component.instance().handleError(api, response);
        expect(component.state('problemChildren')).toEqual([{ api, response }]);
      });
    });

    describe('when the problemChild is already in state', () => {
      it('should not duplicate the api in problemChildren', async () => {
        const component = shallow<Healthy>(<Healthy {...props} />);
        component.setState({ problemChildren: [{ api, response }] });
        await component.instance().handleError(api, response);
        expect(component.state('problemChildren')).toEqual([{ api, response }]);
      });
    });

    describe('when props.onError exists', () => {
      it('should call props.onError', async () => {
        const component = shallow<Healthy>(<Healthy {...props} />);
        await component.instance().handleError(api, response);
        expect(props.onError).toHaveBeenCalled();
      });
    });
  });

  describe('handleClose', () => {
    it('should set hasError to false on state', () => {
      const props: HealthyProps = {
        api: [
          {
            name: 'Test Api',
            endpoint: goodEndpoint,
          },
        ],
      };
      const component = shallow<Healthy>(<Healthy {...props} />);

      component.setState({ hasError: true });
      expect(component.state('hasError')).toBeTruthy();
      component.instance().handleClose();
      expect(component.state('hasError')).toBeFalsy();
    });
  });

  describe('determineMessage', () => {
    describe('when problemChildren has a length === 0', () => {
      it('should return undefined', () => {
        const props: HealthyProps = {
          api: [
            {
              name: 'Test Api',
              endpoint: goodEndpoint,
            },
          ],
        };
        const component = shallow<Healthy>(<Healthy {...props} />);
        expect(component.state('problemChildren')).toHaveLength(0);
        const result = component.instance().determineMessage();
        expect(result).toBe(undefined);
      });
    });

    describe('when problemChildren has a length === 1', () => {
      describe('when a custom message was passed', () => {
        it('should return the custom message', () => {
          const api: Api = {
            name: 'Bad Api',
            endpoint: badEndpoint,
            options: {
              message: 'Hello, world',
            },
          };
          const response: Response = {
            code: 404,
            message: 'Not found',
          };

          const props: HealthyProps = {
            api: [api],
            onError: jest.fn(),
          };

          const component = shallow<Healthy>(<Healthy {...props} />);
          component.setState({
            problemChildren: [
              {
                api,
                response,
              },
            ],
          });
          expect(component.state('problemChildren')).toHaveLength(1);
          const result = component.instance().determineMessage();
          expect(result).toBe('Hello, world');
        });
      });

      describe('when no custom message was passed', () => {
        it('should return the default message', () => {
          const api: Api = {
            name: 'Bad Api',
            endpoint: badEndpoint,
          };
          const response: Response = {
            code: 404,
            message: 'Not found',
          };

          const props: HealthyProps = {
            api: [api],
            onError: jest.fn(),
          };

          const component = shallow<Healthy>(<Healthy {...props} />);
          component.setState({
            problemChildren: [
              {
                api,
                response,
              },
            ],
          });
          expect(component.state('problemChildren')).toHaveLength(1);
          const result = component.instance().determineMessage();
          expect(result).toBe('We are currently experiencing issues with our Bad Api service');
        });
      });
    });

    describe('when problemChildren has a length > 1', () => {
      it('should list the number of services down', () => {
        const api: Api = {
          name: 'Bad Api',
          endpoint: badEndpoint,
        };
        const secondApi: Api = {
          name: 'Bad Api',
          endpoint: badEndpoint,
        };
        const response: Response = {
          code: 404,
          message: 'Not found',
        };

        const props: HealthyProps = {
          api: [api, secondApi],
          onError: jest.fn(),
        };

        const component = shallow<Healthy>(<Healthy {...props} />);
        component.setState({
          problemChildren: [{ api, response }, { api: secondApi, response }],
        });
        expect(component.state('problemChildren')).toHaveLength(2);
        const result = component.instance().determineMessage();
        expect(result).toBe('We are currently experiencing issues with 2 services');
      });
    });
  });

  describe('render', () => {
    describe('when there are no problemChildren', () => {
      it('should match the snapshot', () => {
        const props: HealthyProps = {
          api: [
            {
              name: 'Api',
              endpoint: goodEndpoint,
            },
          ],
        };
        const component = shallow(<Healthy {...props} />);
        expect(component).toMatchSnapshot();
      });
    });

    describe('when there is one problemChild', () => {
      describe('when no custom message is passed', () => {
        it('should match the snapshot', () => {
          const api: Api = {
            name: 'Bad Api',
            endpoint: badEndpoint,
          };
          const response: Response = {
            code: 404,
            message: 'Not found',
          };
          const props: HealthyProps = {
            api: [api],
          };
          const component = shallow<Healthy>(<Healthy {...props} />);
          component.setState({ problemChildren: [{ api, response }] });
          expect(component).toMatchSnapshot();
        });
      });
      describe('when there is a custom message is passed', () => {
        it('should match the snapshot', () => {
          const api: Api = {
            name: 'Bad Api',
            endpoint: badEndpoint,
            options: {
              message: 'Custom Message, here',
            },
          };
          const response: Response = {
            code: 404,
            message: 'Not found',
          };
          const props: HealthyProps = {
            api: [api],
          };
          const component = shallow<Healthy>(<Healthy {...props} />);
          component.setState({ problemChildren: [{ api, response }] });
          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('when there are multiple problemChildren', () => {
      it('should match the snapshot', () => {
        const api: Api = {
          name: 'Bad Api',
          endpoint: badEndpoint,
        };
        const secondApi: Api = {
          name: 'Bad Api',
          endpoint: badEndpoint,
        };
        const thirdApi: Api = {
          name: 'Bad Api',
          endpoint: badEndpoint,
        };
        const response: Response = {
          code: 404,
          message: 'Not found',
        };
        const props: HealthyProps = {
          api: [api, secondApi, thirdApi],
        };
        const component = shallow<Healthy>(<Healthy {...props} />);
        component.setState({ problemChildren: [{ api, response }, { api: secondApi, response}, { api: thirdApi, response}] });
        expect(component).toMatchSnapshot();
      });
    });
  });
});
