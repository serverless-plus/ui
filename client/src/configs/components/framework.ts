import { BASE_FAAS_CONFIG } from '../base/faas';
import { BASE_APIGW_CONFIG } from '../base/apigw';
import { CODE_CONFIG } from '../base/code';
import { REGION_LIST } from '../common';

const framework = {
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
        allows: ['express', 'koa', 'egg', 'next', 'nuxt'],
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
      faas: BASE_FAAS_CONFIG,
      apigw: BASE_APIGW_CONFIG,
    },
  },
};

export default framework;
