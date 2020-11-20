import { deepClone } from '@/utils';

const BASE_APIGW_CONFIG = {
  type: 'object',
  label: 'apigw.options',
  divider: true,
  keys: {
    name: {
      type: 'string',
      label: 'apigw.name',
      ui: 'Input',
      required: false,
      regex: /^[a-zA-Z][a-zA-Z0-9(_)]{0,48}[a-zA-Z0-9]?$/g,
    },
    protocols: {
      type: 'array',
      label: 'apigw.protocols',
      ui: 'MultiSelect',
      default: ['http'],
      allows: ['http', 'https'],
    },
    environment: {
      type: 'string',
      label: 'apigw.environment',
      ui: 'Select',
      default: 'release',
      allows: ['release', 'prepub', 'test'],
    },
  },
};

const APIGW_CONFIG = deepClone(BASE_APIGW_CONFIG);
APIGW_CONFIG.keys.apis = {
  type: 'array',
  label: 'apigw.apiList',
  ui: 'ApiInput',
  default: [],
};

const API_METHODS = ['ANY', 'GET', 'POST', 'PUT', 'DELETE', 'HEAD'];

const API_CONFIG = {
  path: {
    type: 'string',
    label: 'apigw.api.path',
    default: '/',
    ui: 'Input',
    required: true,
  },
  method: {
    type: 'string',
    label: 'apigw.api.method',
    ui: 'Select',
    required: true,
    allows: API_METHODS,
  },
  enableCORS: {
    type: 'boolean',
    label: 'apigw.api.cors',
    ui: 'Radio',
    allows: [true, false],
  },
};

export { BASE_APIGW_CONFIG, API_CONFIG, APIGW_CONFIG, API_METHODS };
