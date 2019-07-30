import React, {useEffect, useState, useCallback, FunctionComponent} from 'react';
import cloneDeep from 'lodash.clonedeep';

import { begin } from '../../services';

import { Api, ApiWithResponse, Response } from '../../typings/Api';

import { BannerContent, BannerWrapper, CloseButton } from './Healthy.styles';
import { HealthyProps } from './types';

const Healthy: FunctionComponent<HealthyProps> = (props: HealthyProps) => {
   const {
    apis,
    onError,
    interval,
    onResponse,
    classes,
    closeable
   } = props;

    const [hasError, setHasError] = useState(false);
    const[problemChildren, setProblemChildren] = useState<ApiWithResponse[]>([]);

    const wrapperClass = classes && classes.banner;
    const contentClass = classes && classes.content;
    const buttonClass = classes && classes.closeButton;
    
    const handleError = useCallback((api: Api, response: Response) => {
        const currentProblems: ApiWithResponse[] = cloneDeep(problemChildren);

        if(currentProblems.find((item: ApiWithResponse) => item.api.endpoint === api.endpoint) === undefined) {
            const newProblem: ApiWithResponse = { api, response };
            currentProblems.push(newProblem);
            setProblemChildren(currentProblems);
        }

        if(typeof onError === 'function') onError(api, response);
    }, [onError]);

    // mount
    useEffect(() => {
        async function callApis() {
            await begin(apis, handleError, interval, onResponse || undefined)
        }

        callApis();
    }, []);

    const handleClose = () => setHasError(false);

    const determineMessage = (): string => {
        const firstProblem: ApiWithResponse = problemChildren[0];

        // check for multiple problems
        if(problemChildren.length > 1) {
            message = `We are currently experiencing issues with ${problemChildren.length} services.`;
        } else {
            // set to default message or message provided
            message = firstProblem.api.message ? firstProblem.api.message : `We are currently experiences issues with our ${firstProblem.api.name} service.`;
        }

        return message;
    }

    let message: string = determineMessage();

    return hasError ? (
        <BannerWrapper className={wrapperClass}>
            <BannerContent className={contentClass}>
                <span>{message}</span>
            </BannerContent>
            {closeable && (
                <CloseButton
                onClick={handleClose}
                className={buttonClass}></CloseButton>
            )}
        </BannerWrapper>
    ) : null


}

export default Healthy;
