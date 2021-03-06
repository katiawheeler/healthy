import React, { Component } from 'react';
import { PageStatus, StatusRow } from '../../components';
import { begin } from '../../services';
import { Api, ApiWithResponse, Response } from '../../typings/Api';
import { Container } from './StatusPage.elements';

interface StatusPageProps {
  /** An array of API objects */
  apis: Api[];
  /** The interval at which to call the APIs in milliseconds */
  interval?: number;
}

interface ApiWithError extends ApiWithResponse {
  hasError: boolean;
}

interface StatusPageState {
  apis: ApiWithError[];
  hasError: boolean;
}

class StatusPage extends Component<StatusPageProps> {
  public state: StatusPageState = {
    apis: [],
    hasError: false,
  };

  public handleError = (api: Api, response: Response) => {
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

  public componentDidMount = async () => {
    const apis = this.props.apis.map(api => ({ api, response: null, hasError: false }));

    this.setState({
      apis,
      hasError: false,
    });

    await begin(this.props.apis, this.handleError, this.props.interval, undefined);
  };

  public render() {
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
