import { BASE_FAAS_CONFIG } from '../base/faas';
import { BASE_APIGW_CONFIG } from '../base/apigw';
import { REGION_LIST } from '../common';

const framework = {
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
