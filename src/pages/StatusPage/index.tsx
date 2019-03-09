import React, { Component } from 'react';
import { Api, ApiWithResponse, Response } from '../../typings/Api';
import { begin } from '../../services';
import { Container } from './StatusPage.elements';
import { PageStatus, StatusRow } from '../../components';

type StatusPageProps = {
  /** An array of API objects */
  apis: Array<Api>;
  /** The interval at which to call the APIs in milliseconds */
  interval?: number;
};

interface ApiWithError extends ApiWithResponse {
  hasError: boolean;
}

type StatusPageState = {
  apis: Array<ApiWithError>;
  hasError: boolean;
};

class StatusPage extends Component<StatusPageProps> {
  state: StatusPageState = {
    apis: [],
    hasError: false,
  };

  handleError = (api: Api, response: Response) => {
    const apis = [...this.state.apis];
    const index = apis.findIndex(stateApi => stateApi.api === api);
    apis[index].hasError = true;
    apis[index].response = response;

    this.setState(
      {
        apis,
        hasError: true
      }
    );
  };

  componentDidMount = async () => {
    const apis = this.props.apis.map(api => ({ api, response: null, hasError: false }));

    this.setState({
      apis: apis,
      hasError: false,
    });

    await begin(this.props.apis, this.handleError, this.props.interval, undefined);
  };

  render() {
    return (
      <Container>
        <PageStatus hasError={this.state.hasError} />
        {this.state.apis.map((api, i) => (
          <StatusRow
            key={api.api.name + api.api.endpoint}
            name={api.api.name}
            hasError={api.hasError}
            className={i === 0 ? 'first' : ''}
          />
        ))}
      </Container>
    );
  }
}

export default StatusPage;
