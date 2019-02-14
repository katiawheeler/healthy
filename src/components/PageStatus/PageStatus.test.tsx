import React from 'react';
import {shallow } from 'enzyme';
import PageStatus from  './';

describe('src/components/PageStatus', () => {
    describe('render', () => {
        describe('when all Apis are healthy', () => {
            it('should render a green banner that says all All services operational!', () => {
                const component = shallow<PageStatus>(<PageStatus />);
                
            })
        })
    })
})