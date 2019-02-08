import { Api, Response } from './Api';

export type Handler = (api: Api, response: Response) => void;
