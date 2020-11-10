import { BASE_FAAS_CONFIG } from '../base/faas';
import { BASE_APIGW_CONFIG } from '../base/apigw';

const framework = {
  inputs: {
    label: 'Inputs',
    type: 'object',
    divider: false,
    border: true,
    keys: {
      framework: {
        type: 'string',
        ui: 'Select',
        label: 'framework.framework',
        default: 'express',
        allows: ['express', 'koa', 'egg', 'next', 'nuxt'],
      },
      src: {
        type: 'object',
        keys: {
          src: {
            required: true,
            type: 'string',
            label: 'app.src.src',
            ui: 'Input',
          },
        },
      },
      region: {
        type: 'string',
        ui: 'Select',
        label: 'app.region',
        default: 'ap-guangzhou',
        action: {
          type: 'REGION_CHANGE',
          key: 'region',
        },
        allows: ['ap-guangzhou', 'ap-beijing', 'ap-shanghai'],
      },
      faas: BASE_FAAS_CONFIG,
      apigw: BASE_APIGW_CONFIG,
    },
  },
};

export default framework;
