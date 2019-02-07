import { Api } from './Api';
import { Response } from './Response';

export type Handler = (api: Api, response: Response) => void;
