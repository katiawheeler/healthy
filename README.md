[![Build status](https://img.shields.io/travis/katiawheeler/healthy.svg?style=flat-square)](https://img.shields.io/travis/katiawheeler/healthy.svg?style=flat-square)
[![Repo size](https://img.shields.io/github/repo-size/katiawheeler/healthy.svg?style=flat-square)](https://img.shields.io/github/repo-size/katiawheeler/healthy.svg?style=flat-square)
[![Open Issues](https://img.shields.io/github/issues/katiawheeler/healthy.svg?style=flat-square)](https://img.shields.io/github/issues/katiawheeler/healthy.svg?style=flat-square)

# Healthy

Healthy is a react-based health check application for the APIs serving your client application. Quickly alert your users to API issues.

## Installation

```
npm i react-healthy
```

or

```
yarn add react-healthy
```

## Usage

You can import one of the pre-made React components from the package or the functionality to create your own status page or banner. The only thing you need to adhere to is the shape of the APIs you pass in.

```
interface Api {
  name: string;
  endpoint: string;
  options?: {
    message: string;
  };
}
```

NPM Package to come!