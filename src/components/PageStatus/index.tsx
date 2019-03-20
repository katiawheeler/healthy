import React, { SFC } from 'react';
import { Banner } from './PageStatus.styles';

export interface PageStatusProps {
    hasError: boolean
}

const PageStatus:SFC<PageStatusProps> = props => <Banner className={props.hasError ? 'error' : ''}>{props.hasError ? 'We are currently experiencing outages with our services. Stay tuned!' : 'All services operational!'}</Banner>

export default PageStatus;