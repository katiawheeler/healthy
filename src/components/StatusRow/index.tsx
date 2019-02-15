import React from 'react';
import { Row, Info, Indicator, Status } from './StatusRow.styles';

type StatusRowProps = {
  name: string;
  hasError: boolean;
  className: string;
};

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
