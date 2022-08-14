[![Build status](https://img.shields.io/travis/katiawheeler/healthy.svg?style=flat-square)](https://img.shields.io/travis/katiawheeler/healthy.svg?style=flat-square)
[![Build size](https://img.shields.io/bundlephobia/min/react-healthy.svg?style=flat-square)](https://img.shields.io/bundlephobia/min/react-healthy.svg?style=flat-square)
[![Open Issues](https://img.shields.io/github/issues/katiawheeler/healthy.svg?style=flat-square)](https://img.shields.io/github/issues/katiawheeler/healthy.svg?style=flat-square)

# 🩺🚀 React Healthy v2.0 🚀🩺

## About

`react-healthy` provides multiple ways of alerting your users to potential API issues that might be affecting their experience in your application.

<br />

---

## Installation

You can install the `react-healthy` package through any node package manager.

```bash
npm i react-healthy
```

or

```bash
yarn add react-healthy
```

<br />

---

## Usage

`react-healthy` comes with two pre-built components that you can utilize in your application. If you'd like to use your own components, you can utilize the `useHealthCheck` hook to manage the logic for you.

> 💡 All components and hooks might take in specific types that will be referenced throughout this documentation. These types can be found in the [`src/types.ts`]('https://github.com/katiawheeler/healthy/blob/master/src/types.ts') file or at the bottom of this README

## Healthy

The `<Healthy />` component is a banner that will display at the top of your application, alerting your users to any issues with your APIs.

`<Healthy />` takes in a [`HealthyConfig`](###healthyconfig) object and handles the rest.

### Basic Usage

Simply import the `<Healthy />` component in your main container (your `Root` file or wherever you are utilizing `ReactDOM.render`), and pass in the config object.

```tsx
// other imports
import App from './App'
import {Healthy, HealthyConfig} from 'react-healthy'

const healthyConfig: HealthyConfig = {
  apis: [
    {
      name: 'Good API',
      endpoint: 'https://httpstat.us/200',
    },
    {
      name: 'Bad API',
      endpoint: 'https://httpstat.us/404',
    },
  ],
}

ReactDOM.render(
  <>
    <Healthy config={healthyConfig} />
    <App />
  </>,
  document.getElementById('root')
)
```

## `StatusPage`

The `<StatusPage />` is a page level component that displays a list of your APIs and their statuses.

The `<StatusPage />` component takes in a [`StatusPageConfig`](###statuspageconfig) object and handles the rest.

### Basic Usage

The `<StatusPage />` component can be used anywhere, including as a main route's component. However you'd like!

```tsx
// other imports
import {StatusPage, StatusPageConfig} from 'react-healthy'

export const MyApp = () => {
  const statusPageConfig: StatusPageConfig = {
    apis: [
      {
        name: 'Good API',
        endpoint: 'https://httpstat.us/200',
      },
      {
        name: 'Bad API',
        endpoint: 'https://httpstat.us/404',
      },
    ],
  }

  return (
    <>
      <StatusPage config={statusPageConfig} />>
    </>
  )
}
```

<br />

---

## `useHealthCheck`

If you want to use your own components or handle the errors in your own way, you can use the `useHealthCheck` hook. The hook takes in a [`HealthCheckConfig`](#healthcheckconfig) similar to the `<Healthy />` and `<StatusPage />` components. Two values are returned from this hook; `pageHasErrors` and `apisWithErrors`.

### Basic Usage

```tsx
// other imports
import App from './App'
import {useHealthCheck, HealthCheckConfig} from 'react-healthy'

const healthCheckConfig: HealthCheckConfig = {
  apis: [
    {
      name: 'Good API',
      endpoint: 'https://httpstat.us/200',
    },
    {
      name: 'Bad API',
      endpoint: 'https://httpstat.us/404',
    },
  ],
}

const MyApp = () => {
  const {pageHasErrors, apisWithErrors} = useHealthCheck(healthCheckConfig)

  return (
    <>
      {pageHasErrors ? <div>Errors!</div> : <div>No Errors!</div>}
      {apisWithErrors.map(api => (
        <div>{api.name} has errors!</div>
      ))}
    </>
  )
}
```

<br />

---

## Docs Table of Contents

- [Types](##Types)
  - [Api](###api)
  - [ApiResponse](###apiresponse)
- [Configs](##configs)
  - [HealthyConfig](###healthyconfig)
  - [StatusPageConfig](###StatusPageConfig)
  - [HealthCheckConfig](###healthcheckconfig)

<br />

---

## Types

### Api

```ts
interface Api {
  /** Name of the API - to be displayed in the banner */
  name: string
  /** Endpoint of the API to ping */
  endpoint: string
}
```

### ApiResponse

```ts
interface ApiResponse {
  /* The API that sent the response */
  api: Api
  /* The response object */
  response?: {
    /* The status code */
    status: number
    /* The status text */
    statusText: string
  }
}
```

### HealthyConfig

```ts
type HealthyConfig = {
  /* An array of APIs to check */
  apis: Api[]
  /** A callback that's called after the component handles the error, for additional error handling */
  onError?: (api: ApiResponse) => void
  /** The interval at which to call the APIs in milliseconds; default is 30 seconds (30000) */
  interval?: number
  /** CSS class names to assign to the banner, banner content, and close button */
  classes?: {
    banner?: string
    content?: string
    closeButton?: string
  }
  /** Messages for the banner */
  messages?: BannerMessages
  /** Whether or not to show a close icon - default is false */
  closeable?: boolean
}
```

### StatusPageConfig

```ts
type StatusPageConfig = {
  /* An array of APIs to check */
  apis: Api[]
  /** The interval at which to call the APIs in milliseconds; default is 30 seconds (30000) */
  interval?: number
  /** Messages for the banner and row */
  messages?: Pick<Messages, 'row' | 'statusPage'>
  /** A callback that's called after the component handles the error, for additional error handling */
  onError?: (api: ApiResponse) => void
}
```

### HealthCheckConfig

```ts
type HealthCheckConfig = {
  /* An array of APIs to check */
  apis: Api[]
  /** The interval at which to call the APIs in milliseconds; default is 30 seconds (30000) */
  interval?: number
  /** A callback that's called after the component handles the error, for additional error handling */
  onError?: (api: ApiResponse) => void
}
```
