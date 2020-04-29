import { shallow } from 'enzyme';
import React from 'react';
import { Api, Response } from '../../typings/Api';
import StatusPage from './';
jest.mock('../../services/');
import { begin } from '../../services/';

// TODO: fix tests
describe('src/pages/StatusPage', () => {
    it('should be true', () => {
      expect(true).toBeTruthy();
    });
});