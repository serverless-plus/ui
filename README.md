# Serverless Plus UI

[![npm](https://img.shields.io/npm/v/@slsplus/ui)](http://www.npmtrends.com/@slsplus/ui)
[![NPM downloads](http://img.shields.io/npm/dm/@slsplus/ui.svg?style=flat-square)](http://www.npmtrends.com/@slsplus/ui)
[![Build Status](https://github.com/serverless-plus/ui/workflows/Validate/badge.svg?branch=master)](https://github.com/serverless-plus/ui/actions?query=workflow:Validate+branch:master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Serverless Plus UI Tool

## Usage

```bash
$ npm i @slsplus/ui --save
```

```js
import { startServer } from '@slsplus/ui';

startServer();
```

## Async parameter config

Sometimes, we should get parameters(eg: vpc list) list by api, but they are developer's cloud resources, so if you want to config these parameters, `@slsplus/ui` server need authentication. So please config `TENCENT_SECRET_ID` and `TENCENT_SECRET_KEY` in global environment variables.

Of course, if you are using [@slsplus/cli](https://github.com/serverless-plus/cli), you can run `sp config` command to config it.

```bash
$ sp config
? SecretId ******
? SecretKey ******
```

## Development

Install dependencies:

```bash
$ npm run bootstrap
```

Run server and client:

```bash
$ npm run dev
```

## License

MIT License

Copyright (c) 2020 Serverless Plus
