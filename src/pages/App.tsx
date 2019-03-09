import React, { Component } from 'react';
import Healthy from '../components/Healthy';
import { Api } from '../typings/Api';
import { Global, css } from '@emotion/core';
import StatusPage from './StatusPage';

const oneFailing: Array<Api> = [
  {
    name: 'Health Default',
    endpoint: 'https://jsonplaceholder.typicode.com/todos/1',
    options: {
      message:
        'We are currently experiencing problems with the Todo API. Please try your request later.',
    },
  },
  {
    name: 'Values Default',
    endpoint: 'https://httpstat.us/401',
    options: {
      message:
        'We are currently experiencing problems with the Values API. Please try your request later.',
    },
  },
];

const fiveFailing: Array<Api> = [
  {
    name: 'Values Default',
    endpoint: 'https://httpstat.us/200',
  },
  {
    name: 'not found',
    endpoint: 'https://httpstat.us/404',
  },
  {
    name: 'not found',
    endpoint: 'https://httpstat.us/403',
  },
  {
    name: 'not found',
    endpoint: 'https://httpstat.us/500',
  },
  {
    name: 'not found',
    endpoint: 'https://httpstat.us/501',
  },
  {
    name: 'not found',
    endpoint: 'https://httpstat.us/409',
  },
];

const withCustomMessage: Array<Api> = [
  {
    name: 'not found',
    endpoint: 'https://httpstat.us/404',
    options: {
      message: 'Hello world2',
    },
  },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Global
          styles={css`
            body {
              margin: 0;
              padding: 0;
            }
          `}
        />
        <StatusPage apis={fiveFailing} />
        {/* <Healthy
          apis={fiveFailing}
        /> */}
      </div>
    );
  }
}

export default App;
