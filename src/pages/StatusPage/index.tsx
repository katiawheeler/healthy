import React, { Component } from 'react';
import { Api, ApiWithResponse } from '../../typings/Api';
import { begin } from '../../services';
import { Container } from './StatusPage.elements';
import StatusRow from '../../components/StatusRow';

type StatusPageProps = {
  /** An array of API objects */
  apis: Array<Api>;
  /** The interval at which to call the APIs in milliseconds */
  interval?: number;
}

interface ApiWithError extends ApiWithResponse {
    hasError: boolean
}

type StatusPageState = {
    problemChildren: Array<ApiWithError>
} 

class StatusPage extends Component<StatusPageProps> {
    state: StatusPageState ={
        problemChildren: []
    }

    handleError = (api: Api) => {
        console.log(api)
    }

    componentDidMount = async () => {
        await begin(this.props.apis, this.handleError, this.props.interval, undefined)
    }

    render() {
        return <Container>
            <PageStatus hasError={this.state.problemChildren.length > 0}/>
        {this.props.apis.map(
        api => <StatusRow key={api.name + api.endpoint} name={api.name} hasError={false}></StatusRow>
        )}
        </Container>
    }
}

export default StatusPage;
