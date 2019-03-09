import React from 'react';
import {shallow } from 'enzyme';
import PageStatus from  './';
import { Banner } from './PageStatus.styles';

describe('src/components/PageStatus', () => {
    describe('render', () => {
        describe('when all Apis are healthy', () => {
            it('should render a green banner with the success message', () => {
                const component = shallow<PageStatus>(<PageStatus hasError={false} />);
                expect(component.find(Banner).props().className).toBe('')
                expect(component.find(Banner).children().text()).toBe('All services operational!')
            })
        })

        describe('when there is an error', () => {
            it('should render a red banner with the error message', () => {
                const component = shallow<PageStatus>(<PageStatus hasError={true} />);
                expect(component.find(Banner).props().className).toBe('error');
                expect(component.find(Banner).children().text()).toBe('We are currently experiencing outages with our services. Stay tuned!')
            })

        })
    })
})