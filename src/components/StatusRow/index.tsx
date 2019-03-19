import * as React from 'react';
import { Indicator, Info, Row, Status } from './StatusRow.styles';

export interface StatusRowProps {
  name: string;
  hasError: boolean;
  className?: string;
}

const StatusRow = (props: StatusRowProps) => {
  return (
    <Row className={props.className}>
      <Info>
        <h4>{props.name}</h4>
      </Info>
      <Status>
        <Indicator className={props.hasError ? 'error' : 'ok'}>{props.hasError ? 'Service Interruption' : 'Operational'}</Indicator>
      </Status>
    </Row>
  );
};

export default StatusRow;
