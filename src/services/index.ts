import { Api, Response as ApiResponse } from '../typings/Api';
import { Handler } from '../typings/Handler';
 
/** Begins the chain of API calls */
export const begin = async (apis: Api[], onResponse: Handler, interval?: number) => {
 const currentInterval = interval ? interval : 30000;
 
 apis.forEach(async a => {
   await makeCall(a, onResponse);
 });
 
 /** Set the timeout and do it again */
 setTimeout(async () => await begin(apis, onResponse, currentInterval), currentInterval);
};
 
/** Make the actual fetch and return a Response object */
const makeCall = async (api: Api, onResponse: Handler) => {
 await fetch(api.endpoint)
   .then(apiResponse => handleResponse(api, apiResponse, onResponse))
   // tslint:disable-next-line
   .catch(error => handleResponse(api, error, onResponse));
};
 
/**
* Handles the Response
*/
const handleResponse = (api: Api, response: Response, onResponse: Handler) => {
 const apiResponse: ApiResponse = {
   code: response.status,
   message: response.statusText,
 };
 
 onResponse(api, apiResponse);
};
 
export default { begin, makeCall, handleResponse };