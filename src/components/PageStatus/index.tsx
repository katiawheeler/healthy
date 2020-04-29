import React from 'react';
import { Banner } from './PageStatus.styles';

export interface PageStatusProps {
    hasError: boolean
}

function PageStatus({ hasError }: PageStatusProps) {
    return <Banner className={hasError ? 'error' : ''} data-testid="banner">
        {hasError ? 'We are currently experiencing outages with our services. Stay tuned!' : 'All services operational!'}
    </Banner>
}

export default PageStatus;