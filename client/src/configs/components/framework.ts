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
      framework: {
        type: 'string',
        ui: 'Select',
        label: 'framework.framework',
        default: 'express',
        allows: [
          'express',
          'koa',
          'egg',
          'next',
          'nuxt',
          'nest',
          'flask',
          'django',
          'laravel',
          'thinkphp',
        ],
      },
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
      'faas.projectName': {
        required: true,
        type: 'string',
        label: 'faas.projectName',
        dependField: 'inputs.framework',
        display: {
          key: 'inputs.framework',
          value: 'django',
        },
        ui: 'Input',
        regex: /^[A-Za-z][\w]{0,58}[A-Za-z]$/g,
      },
      faas: BASE_FAAS_CONFIG,
      apigw: BASE_APIGW_CONFIG,
    },
  },
};

const defaultConfigs: InitConfig = {
  js: {
    component: 'framework',
    name: 'framework-demo',
    'inputs.framework': 'express',
    'inputs.region': 'ap-guangzhou',
    'inputs.src.src': './',
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
  yaml: `component: framework
name: framework-demo
inputs:
  framework: express
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
