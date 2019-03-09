import { shallow } from 'enzyme';
import React from 'react';
import StatusRow from './index';
import { Indicator, Info } from './StatusRow.styles';

describe('src/components/StatusRow', () => {
    describe('render', () => {
        describe('when there is props.hasError = false', () => {
            it('should render with the Api name', () => {
                const component = shallow<StatusRow>(<StatusRow name="Api Name" hasError={false} />);
                expect(component.find(Info).children().text()).toBe('Api Name')
            });

            it('should render one Indicator with the className = ok and text = Operational', () => {
                const component = shallow<StatusRow>(<StatusRow name="Api Name" hasError={false} />);
                const indicator = component.find(Indicator);
                expect(indicator.props().className).toBe('ok')
                expect(indicator.children().text()).toBe('Operational')
            })
        });

        describe('when there is props.hasError = false', () => {
            it('should render one Indicator with the className = error and text = Service Interruption', () => {
                const component = shallow<StatusRow>(<StatusRow name="Api Name" hasError />);
                const indicator = component.find(Indicator);
                expect(indicator.props().className).toBe('error')
                expect(indicator.children().text()).toBe('Service Interruption')
            })
        })
    })
})