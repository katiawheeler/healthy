import { Api, Response as ApiResponse } from '../typings/Api';
import { Handler } from '../typings/Handler';

/** Begins the chain of API calls */
export const begin = async (
  apis: Api[],
  onError: Handler,
  interval?: number,
  onResponse?: Handler
) => {
  const currentInterval = interval ? interval : 30000;

  apis.forEach(async a => {
    await makeCall(a, onError, onResponse || undefined);
  });

  /** Set the timeout and do it again */
  setTimeout(
    async () => await begin(apis, onError, currentInterval, onResponse || undefined),
    currentInterval
  );
};

/** Make the actual fetch and return a Response object */
const makeCall = async (api: Api, onError: Handler, onResponse?: Handler) => {
  await fetch(api.endpoint)
    .then(apiResponse => handleResponse(api, apiResponse, onError, onResponse || undefined))
    // tslint:disable-next-line
    .catch(error => console.log('unhandled', error));
};

/**
 * Handles the Response
 */
const handleResponse = (api: Api, response: Response, onError: Handler, onResponse?: Handler) => {
  const apiResponse: ApiResponse = {
    code: response.status,
    message: response.statusText,
  };

  if (!response.ok) {
    onError(api, apiResponse);
    return;
  }

  if (onResponse) {
    onResponse(api, apiResponse);
  }
};

export default { begin, makeCall, handleResponse };
