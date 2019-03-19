import * as React from 'react';
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
  isCloseable?: boolean;
}

export interface HealthyState {
  hasError: boolean;
  problemChildren: ApiWithResponse[];
}

class Healthy extends React.Component<HealthyProps> {
  public state: HealthyState = {
    hasError: false,
    problemChildren: [],
  };

  public componentDidMount = async () => {
    await begin(this.props.apis, this.handleError, this.props.interval, this.props.onResponse || undefined);
  };

  public handleError = (api: Api, response: Response) => {
    const problemChildren = this.state.problemChildren;
    if (problemChildren.find(item => item.api.endpoint === api.endpoint) === undefined) {
      problemChildren.push({ api, response });
    }
    this.setState({
      problemChildren,
      hasError: true,
    });
    if (this.props.onError) { this.props.onError(api, response); }
  };

  public handleClose = () => this.setState({ hasError: false });

  public determineMessage = () => {
    if (this.state.problemChildren.length === 0) { return; }
    const firstApi: ApiWithResponse = this.state.problemChildren[0];

    // set to default message or message provided in options
    let message = firstApi.api.options ? firstApi.api.options.message : `We are currently experiencing issues with our ${
      firstApi.api.name
    } service`;

    // if there are more than one APIs down, show how many services are down
    if (this.state.problemChildren.length > 1) {
      message = `We are currently experiencing issues with ${this.state.problemChildren.length} services`;
    }

    return message;
  };

  public render() {
    const message = this.determineMessage();
    return (
      this.state.hasError && (
        <BannerWrapper className={this.props.classes && this.props.classes.banner}>
          <BannerContent className={this.props.classes && this.props.classes.content}>
            <span>{message}</span>
          </BannerContent>
          {this.props.isCloseable && (
            <CloseButton
              onClick={this.handleClose}
              className={this.props.classes && this.props.classes.closeButton}
            >
              x
            </CloseButton>
          )}
        </BannerWrapper>
      )
    );
  }
}

export default Healthy;
