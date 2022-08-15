import {Api} from '../types'

const goodEndpoint = 'https://httpstat.us/200'
const badEndpoint = 'https://httpstat.us/404'

const waitForOptions = {interval: 1500}
const goodApis: Api[] = [
  {
    endpoint: goodEndpoint,
    name: 'Good API 1',
  },
  {
    endpoint: goodEndpoint,
    name: 'Good API 2',
  },
]
const badApis: Api[] = [
  {
    endpoint: badEndpoint,
    name: 'Bad API 1',
  },
  {
    endpoint: badEndpoint,
    name: 'Bad API 2',
  },
]
const constants = {
  waitForOptions,
  goodApis,
  badApis,
}

export default constants
