import { Api } from '../../typings/Api';
import { Handler } from '../../typings/Handler';

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
