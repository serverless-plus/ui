import { InitConfig } from '@/typings';
import { BASE_FAAS_CONFIG } from '../base/faas';
import { BASE_APIGW_CONFIG } from '../base/apigw';
import { CODE_CONFIG } from '../base/code';
import { REGION_LIST } from '../common';

const parameters = {
  inputs: {
    label: 'Inputs',
    type: 'object',
    divider: false,
    border: true,
    keys: {
      src: CODE_CONFIG,
      region: {
        type: 'string',
        ui: 'Select',
        label: 'app.region',
        default: 'ap-guangzhou',
        action: {
          type: 'global/REGION_CHANGE',
          key: 'inputs.region',
        },
        allows: REGION_LIST,
      },
      faas: BASE_FAAS_CONFIG,
      apigw: BASE_APIGW_CONFIG,
    },
  },
};

const defaultConfigs: InitConfig = {
  js: {
    component: 'express',
    name: 'express-demo',
    'inputs.src.src': './',
    'inputs.region': 'ap-guangzhou',
    'inputs.faas.name': 'express-app',
    'inputs.faas.runtime': 'Nodejs10.15',
    'inputs.faas.timeout': 3,
    'inputs.faas.memorySize': 128,
    'inputs.faas.publicAccess': false,
    'inputs.faas.eip': false,
    'inputs.apigw.name': 'serverless',
    'inputs.apigw.environment': 'release',
    'inputs.apigw.protocols': ['http', 'https'],
  },
  yaml: `component: express
name: express-demo
inputs:
  src:
    src: ./
  region: ap-guangzhou
  faas:
    name: express-app
    runtime: Nodejs10.15
    timeout: 3
    memorySize: 128
  apigw:
    name: serverless
    protocols:
      - http
      - https
    environment: release`,
};

export { parameters, defaultConfigs };
