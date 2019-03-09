import React from 'react';
import { shallow } from 'enzyme';
import StatusPage from './';
import { Api, Response } from '../../typings/Api';
jest.mock('../../services/');
import { begin } from '../../services/';


describe('src/pages/StatusPage', () => {
    const apis: Array<Api> = [
        {
            name: 'Api 1',
            endpoint: 'https://google.com',
        },
        {
            name: 'Api 2',
            endpoint: 'https://yahoo.com'
        }
    ];

    describe('render', () => {
        describe('default render', () => {
            it('should match the snapshot', () => {
                const component = shallow(<StatusPage apis={apis}/>);
                expect(component).toMatchSnapshot();
            })
        })
    });

    describe('handleError', () => {
        it('should update the api in state', async () => {
            const component = shallow<StatusPage>(<StatusPage apis={apis} />);
            const mockResponse: Response = {
                code: 500,
                message: 'It broke'
            }
            
            await component.instance().handleError(apis[0], mockResponse);

            expect(component.state('apis')).toEqual([
                {
                    api: {
                        name: 'Api 1',
                        endpoint: 'https://google.com',
                    },
                    response: {
                        code: 500,
                        message: 'It broke'
                    },
                    hasError: true
                },
                {
                    api: {
                    name: 'Api 2',
                    endpoint: 'https://yahoo.com',
                    },
                    response: null,
                    hasError: false
                }
            ])
        })
    })

    describe('componentDidMount', () => {
        it('should update state from props', async () => {
            const component = shallow<StatusPage>(<StatusPage apis={apis} />);
            await component.instance().componentDidMount();

            expect(component.state('apis')).toEqual([
                {
                    api: {
                        name: 'Api 1',
                        endpoint: 'https://google.com',
                    },
                    response: null,
                    hasError: false
                },
                {
                    api: {
                    name: 'Api 2',
                    endpoint: 'https://yahoo.com',
                    },
                    response: null,
                    hasError: false
                }
            ])
        })

        it('should call begin', async () => {
            const component = shallow<StatusPage>(<StatusPage apis={apis} />);
            await component.instance().componentDidMount();

            expect(begin).toHaveBeenCalled();
        })
    })
})