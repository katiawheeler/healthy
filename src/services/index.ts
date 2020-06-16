import { Api, Response as ApiResponse } from '../typings/Api';
import { Handler } from '../typings/Handler';
 
/** Begins the chain of API calls */
export const begin = async (apis: Api[], onSuccess: Handler, onError:Handler, interval?: number) => {
 const currentInterval = interval ? interval : 30000;
 
 apis.forEach(async a => {
   await makeCall(a, onSuccess, onError);
 });
 
 /** Set the timeout and do it again */
 setTimeout(async () => await begin(apis, onSuccess, onError, currentInterval), currentInterval);
};
 
/** Make the actual fetch and return a Response object */
const makeCall = async (api: Api, onSuccess: Handler, onError:Handler) => {


 await fetch(api.endpoint)
   .then(apiResponse => handleResponse(api, onSuccess, onError, apiResponse))
   // tslint:disable-next-line
   .catch(error => handleResponse(api, onSuccess, onError));
};
 
/**
* Handles the Response
*/
const handleResponse = (api: Api, onSuccess: Handler, onError:Handler, response?: Response) => {

  if(response){

    const apiResponse: ApiResponse = {
      code: response.status,
      message: response.statusText,
    };

    (200 == apiResponse.code || 
      201 == apiResponse.code || 
      202 == apiResponse.code || 
      203 == apiResponse.code || 
      204 == apiResponse.code || 
      205 == apiResponse.code || 
      206 == apiResponse.code || 
      207 == apiResponse.code || 
      208 == apiResponse.code || 
      226 == apiResponse.code)  ? onSuccess(api, apiResponse) : onError(api, apiResponse);

  } else {
    onError(api);
  }

};

 
export default { begin, makeCall, handleResponse };