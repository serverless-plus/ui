import { BASE_FAAS_CONFIG } from '../base/faas';
import { BASE_APIGW_CONFIG } from '../base/apigw';

const websocket = {
  inputs: {
    label: 'Inputs',
    type: 'object',
    divider: false,
    border: true,
    keys: {
      src: {
        type: 'object',
        keys: {
          src: {
            required: true,
            type: 'string',
            label: 'Code Path',
            ui: 'Input',
          },
        },
      },
      region: {
        type: 'string',
        ui: 'Select',
        label: 'Region',
        default: 'ap-guangzhou',
        allows: ['ap-guangzhou', 'ap-beijing', 'ap-shanghai'],
      },
      faas: BASE_FAAS_CONFIG,
      apigw: BASE_APIGW_CONFIG,
    },
  },
};

export default websocket;
