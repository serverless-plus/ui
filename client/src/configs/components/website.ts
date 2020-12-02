import { InitConfig } from '@/typings';
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
      bucket: {
        type: 'string',
        ui: 'Input',
        label: 'website.bucket',
        required: true,
      },
      protocol: {
        type: 'string',
        ui: 'Select',
        label: 'website.protocol',
        allows: ['https', 'http'],
        required: true,
      },
      replace: {
        type: 'boolean',
        ui: 'Switch',
        label: 'website.replace',
        allows: [
          {
            value: true,
            label: 'yes',
          },
          {
            value: false,
            label: 'no',
          },
        ],
      },
      envs: {
        type: 'string',
        ui: 'EnvInput',
        label: 'website.envs',
      },
      cdns: {
        type: 'array',
        ui: 'CdnInput',
        label: 'website.cdns',
      },
    },
  },
};

const defaultConfigs: InitConfig = {
  js: {
    component: 'website',
    name: 'website-demo',
    'inputs.region': 'ap-guangzhou',
    'inputs.src.src': './',
    'inputs.bucket': 'website-app',
    'inputs.protocol': 'https',
  },
  yaml: `component: website
name: website-demo
inputs:
  src:
    src: ./
    index: index.html
    error: index.html
  region: ap-guangzhou
  bucket: website-demo
  protocol: https`,
};

export { parameters, defaultConfigs };
