import React, { useState, useEffect, useCallback } from 'react';
import { begin } from '../../services';
import { Api, ApiWithResponse, Response } from '../../typings/Api';
import { Handler } from '../../typings/Handler';
import { BannerContent, BannerWrapper, CloseButton } from './Healthy.styles';

export interface HealthyProps {
  /** An array of API objects */
  apis: Api[];
  /** A callback that's called after the component handles the error, for additional error handling */
  onError?: Handler;
  /** The interval at which to call the APIs in milliseconds; default is 30 seconds (30000) */
  interval?: number;
  /** A callback to handle all responses that are not errors, in case
   * you want to handle different responses differently
   */
  onResponse?: Handler;
  /** CSS class names to assign to the banner, banner content, and close button */
  classes?: {
    banner?: string;
    content?: string;
    closeButton?: string;
  };
  /** Whether or not to show a close icon - default is false */
  closeable?: boolean;
}

export function HealthyComponent({ apis, onError, interval, onResponse, classes, closeable }: HealthyProps) {
  const [hasError, setHasError] = useState<boolean>(false);
  const [problemChildren, setProblemChildren] = useState<ApiWithResponse[]>([]);

  useEffect(() => {
    async function startChecking() {
      await begin(apis, handleError, interval, onResponse);
    }

    startChecking();
  }, [])

  const handleError = useCallback((api: Api, response: Response) => {
    setHasError(true);
    const currentProblems = [...problemChildren];
    if (currentProblems.find((item: ApiWithResponse) => item.api.endpoint === api.endpoint) === undefined) {
      currentProblems.push({ api, response });
      setProblemChildren(currentProblems);
    }

    if (typeof onError === 'function') onError(api, response);
  }, [onError])

  const handleClose = () => setHasError(false)

  const determineMessage = () => {
    if (!problemChildren.length) return;

    // single issue
    if (problemChildren.length === 1) {
      const issueApi: ApiWithResponse = problemChildren[0];
      const defaultMessage = `We are currently experiencing issues with our ${
        issueApi.api.name
        } service`;
      return issueApi.api.message ? issueApi.api.message : defaultMessage
    } else {
      // multiple issues
      return `We are currently experiencing issues with ${problemChildren.length} services`;
    }
  }

  return (
    hasError ? (
      <BannerWrapper className={classes && classes.banner}>
        <BannerContent className={classes && classes.content}>
          <span>{determineMessage()}</span>
        </BannerContent>
        {closeable && (
          <CloseButton
            onClick={handleClose}
            className={classes && classes.closeButton}
          >
            x
          </CloseButton>
        )}
      </BannerWrapper>
    ) : null
  )
}

export default HealthyComponent;
