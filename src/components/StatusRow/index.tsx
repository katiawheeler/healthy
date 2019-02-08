import React from 'react';
import { Row, Info, Indicator, Status } from './StatusRow.styles';

type StatusRowProps = {
  name: string;
  hasError: boolean;
};

const StatusRow = (props: StatusRowProps) => {
  return (
    <Row>
      <Info>
        <h4>{props.name}</h4>
      </Info>
      <Status>
        <Indicator className={props.hasError ? 'error' : 'ok'}>{props.hasError ? 'Experiencing issues' : 'Operational'}</Indicator>
      </Status>
    </Row>
  );
};

export default StatusRow;
