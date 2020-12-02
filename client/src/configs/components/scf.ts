import { InitConfig } from '@/typings';
import { FAAS_CONFIG } from '../base/faas';
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
      ...FAAS_CONFIG.keys,
    },
  },
};

const defaultConfigs: InitConfig = {
  js: {
    component: 'scf',
    name: 'scf-demo',
    'inputs.region': 'ap-guangzhou',
    'inputs.src.src': './',
    'inputs.name': 'express-app',
    'inputs.runtime': 'Nodejs10.15',
    'inputs.timeout': 3,
    'inputs.memorySize': 128,
    'inputs.publicAccess': false,
    'inputs.eip': false,
  },
  yaml: `component: scf
name: scf-demo
inputs:
  src:
    src: ./
  region: ap-guangzhou
  name: scfdemo
  runtime: Nodejs10.15
  timeout: 3
  memorySize: 128
  publicAccess: false
  eip: false`,
};

export { parameters, defaultConfigs };
