import React from 'react';

type PageStatusProps = {
    hasError: boolean
};

const PageStatus = (props: PageStatusProps) => <div>hi {props.hasError}</div>

export default PageStatus;