export interface HealthyProps {
  /** An array of API objects */
  api: Array<Api>;
  /** A callback to handle when one of the APIs errors */
  onError: Handler;
  /** The interval at which to call the APIs in milliseconds */
  interval?: number;
  /** A callback to handle all responses that are not errors, in case
   * you want to handle different responses differently
   */
  onResponse?: Handler;
  /** CSS class names to assign to the banner, banner content, and close button*/
  classes?: Classes;
  /** Whether or not to show a close icon - default is false */
  isCloseable?: boolean;
}

interface Classes {
  banner?: string;
  content?: string;
  closeButton?: string;
}

interface ApiWithResponse {
  api: Api;
  response: Response;
}

export interface HealthyState {
  hasError: boolean;
  problemChildren: Array<ApiWithResponse>;
}
