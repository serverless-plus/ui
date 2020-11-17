import { InitConfig } from './typings';

const DEFAULT_CONFIG: InitConfig = {
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
    'inputs.apigw.protocols': ['http'],
    'inputs.apigw.apis': [{ path: '/', method: 'ANY' }],
  },
  yaml: `component: framework
name: framework-demo
inputs:
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
    environment: release
    apis:
      - path: /
        method: ANY`,
};

const COMPONENT_LIST = ['express', 'framework', 'websocket'];

const COMMON_CONFIGS = {
  component: {
    type: 'string',
    label: 'app.component',
    required: true,
    ui: 'Select',
    allows: COMPONENT_LIST,
    action: {
      type: 'global/COMPONENT_CHANGE',
      key: 'component',
    },
  },
  name: {
    type: 'string',
    label: 'app.name',
    required: true,
    description: 'app.name.description',
    ui: 'Input',
  },
};

const REGION_LIST: string[] = [
  'ap-guangzhou',
  'ap-shanghai',
  'ap-hongkong',
  'ap-beijing',
  'ap-chengdu',
  'ap-tokyo',
  'ap-mumbai',
  'ap-singapore',
  'na-siliconvalley',
  'na-toronto',
];

export { DEFAULT_CONFIG, REGION_LIST, COMPONENT_LIST, COMMON_CONFIGS };
