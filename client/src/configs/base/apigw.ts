const APIGW_CONFIG = {
  type: 'object',
  label: 'API Gateway Options',
  divider: true,
  keys: {
    name: {
      type: 'string',
      label: 'Service Name',
      ui: 'Input',
      regex: /^[a-zA-Z][a-zA-Z0-9(_)]{0,48}[a-zA-Z0-9]?$/g,
    },
    protocols: {
      type: 'array',
      label: 'Protocols',
      ui: 'MultiSelect',
      default: ['http'],
      allows: ['http', 'https'],
    },
    environment: {
      type: 'string',
      label: 'Environment',
      ui: 'Select',
      default: 'release',
      allows: ['release', 'prepub', 'test'],
    },
    apis: {
      type: 'array',
      label: 'API List',
      ui: 'ApiInputs',
      default: [],
    },
  },
};

const API_METHODS = ['ANY', 'GET', 'POST'];

const API_CONFIG = {
  path: {
    type: 'string',
    label: 'Path',
    default: '/',
    ui: 'Input',
    required: true,
  },
  method: {
    type: 'string',
    label: 'Method',
    ui: 'Select',
    required: true,
    allows: API_METHODS,
  },
  enableCORS: {
    type: 'boolean',
    label: 'CORS',
    ui: 'Radio',
    allows: [true, false],
  },
};

export { API_CONFIG, APIGW_CONFIG, API_METHODS };
