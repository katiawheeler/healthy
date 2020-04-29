import React, { useState, useEffect } from 'react';
import { PageStatus, StatusRow } from '../../components';
import { begin } from '../../services';
import { Api, ApiWithResponse, Response } from '../../typings/Api';
import { Container } from './StatusPage.styles';

interface StatusPageProps {
  /** An array of API objects */
  apis: Api[];
  /** The interval at which to call the APIs in milliseconds */
  interval?: number;
}

interface ApiWithError extends ApiWithResponse {
  hasError: boolean;
}

function mapApis(apis: Api[]): ApiWithError[] {
  return apis.map(api => ({ api, response: null, hasError: false }))
}

function StatusPage({ apis: propApis, interval = undefined }: StatusPageProps) {
  const [apis, setApis] = useState(mapApis(propApis))
  const [hasError, setHasError] = useState(false);

  const handleError = (api: Api, response: Response) => {
    setHasError(true);

    const currentApis = [...apis];
    const index = currentApis.findIndex(stateApi => stateApi.api === api);
    currentApis[index].hasError = true;
    currentApis[index].response = response;

    setApis(currentApis);
  };

  useEffect(() => {
    async function startChecking() {
      await begin(propApis, handleError, interval, undefined);
    }

    startChecking();
  }, []);

  return (
    <Container>
      <PageStatus hasError={hasError} />
      {apis.map((api, i) => (
        <StatusRow
          key={api.api.name + api.api.endpoint}
          name={api.api.name}
          hasError={api.hasError}
          className={i === 0 ? 'first' : ''}
        />
      ))}
    </Container>
  )
}


export default StatusPage;
