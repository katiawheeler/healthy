import { Api } from '../typings/Api';
import { Response as ApiResponse } from '../typings/Response';
import { Handler } from '../typings/Handler';

/** Begins the chain of API calls */
export const begin = async (
  api: Array<Api>,
  onError: Handler,
  interval?: number,
  onResponse?: Handler
) => {
  const currentInterval = interval ? interval : 30000;

  api.forEach(async a => {
    await makeCall(a, onError, onResponse);
  });

  /** Set the timeout and do it again */
  setTimeout(() => begin(api, onError, currentInterval, onResponse), currentInterval);
};

/** Make the actual fetch and return a Response object */
const makeCall = async (api: Api, onError: Handler, onResponse?: Handler) => {
  await fetch(api.endpoint)
    .then(apiResponse => handleResponse(api, apiResponse, onError, onResponse))
    .catch(error => console.log('unhandled', error));
};

const handleResponse = (api: Api, response: Response, onError: Handler, onResponse?: Handler) => {
  const apiResponse: ApiResponse = {
    code: response.status,
    message: response.statusText,
  };

  if (!response.ok) {
    onError(api, apiResponse);
    return;
  }

  if (onResponse) onResponse(api, apiResponse);
};
