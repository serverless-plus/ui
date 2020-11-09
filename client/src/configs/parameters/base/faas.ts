import { deepClone } from '@/utils';

const BASE_FAAS_CONFIG = {
  type: 'object',
  label: 'Faas Options',
  divider: true,
  keys: {
    name: {
      required: true,
      type: 'string',
      label: 'Faas Name',
      ui: 'Input',
      regex: /^[A-Za-z][\w-]{0,58}[A-Za-z0-9]$/g,
    },
    runtime: {
      required: true,
      type: 'string',
      label: 'Runtime',
      ui: 'Select',
      default: 'Nodejs10.15',
      allows: ['Nodejs12.16', 'Nodejs10.15', 'Nodejs8.9', 'Nodejs6.10'],
    },
    memorySize: {
      type: 'number',
      ui: 'Select',
      label: 'Memory Size',
      default: 128,
      allows: [
        64,
        128,
        256,
        384,
        512,
        640,
        768,
        896,
        1024,
        1152,
        1280,
        1408,
        1536,
        1664,
        1792,
        1920,
        2048,
        2176,
        2304,
        2432,
        2560,
        2688,
        2816,
        2944,
        3072,
      ],
    },
    environment: {
      type: 'array',
      label: 'Environment',
      ui: 'EnvInputs',
      default: [],
    },
  },
};

const FAAS_CONFIG = deepClone(BASE_FAAS_CONFIG);
FAAS_CONFIG.keys.triggers = {
  type: 'array',
  label: 'Trigger List',
  ui: 'TriggerInputs',
  default: [],
};

export { BASE_FAAS_CONFIG, FAAS_CONFIG };
