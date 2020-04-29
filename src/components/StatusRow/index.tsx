import React from 'react';
import { Indicator, Info, Row, Status } from './StatusRow.styles';

export interface StatusRowProps {
  name: string;
  hasError: boolean;
  className?: string;
}

function StatusRow({ name, hasError, className = '' }: StatusRowProps) {
  return (
    <Row className={className} data-testid="row">
      <Info>
        <h4>{name}</h4>
      </Info>
      <Status>
        <Indicator className={hasError ? 'error' : 'ok'}>{hasError ? 'Service Interruption' : 'Operational'}</Indicator>
      </Status>
    </Row>
  );
};

export default StatusRow;
