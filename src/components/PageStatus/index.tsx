import React from 'react';
import { Banner } from './PageStatus.styles';

type PageStatusProps = {
    hasError: boolean
};

const PageStatus = (props: PageStatusProps) => <Banner>{props.hasError ? 'We are currently experiencing outages with our services. Stay tuned!' : 'All services operational!'}</Banner>

export default PageStatus;