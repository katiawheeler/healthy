import React, { Component } from 'react';
import Healthy from '../components/Healthy';
import { Api } from '../typings/Api';
import { Response } from '../typings/Response';
import { Global, css } from '@emotion/core';

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

const twoFailing: Array<Api> = [
  {
    name: 'Values Default',
    endpoint: 'https://httpstat.us/401',
  },
  {
    name: 'not found',
    endpoint: 'https://httpstat.us/404',
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
        <Healthy
          isCloseable
          api={oneFailing}
          onError={(api: Api, response: Response) => {
            console.log('handled error', api);
            console.log('handled error response', response);
          }}
          onResponse={(api: Api, response: Response) => {
            console.log('got api', api);
            console.log('got response', response);
          }}
        />
      </div>
    );
  }
}

export default App;
