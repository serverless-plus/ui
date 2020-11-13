import { InitConfig } from './typings';

const DEFAULT_CONFIG: InitConfig = {
  js: {
    component: 'framework',
    name: 'framework-demo',
    'inputs.framework': 'express',
    'inputs.region': 'ap-guangzhou',
    'inputs.src.src': './',
    'inputs.faas.name': 'test',
    'inputs.faas.runtime': 'Nodejs10.15',
    'inputs.faas.memorySize': '128',
    'inputs.apigw.name': 'serverless',
    'inputs.apigw.environment': 'release',
    'inputs.apigw.protocols': ['http'],
    'inputs.apigw.apis': [{ path: '/', method: 'ANY' }],
  },
  yaml: `component: websocket
name: websocket-demo
inputs:
  src:
    src: ./
  region: ap-guangzhou
  faas:
    name: test
    runtime: Nodejs10.15
    memorySize: '128'
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

const REGION_LIST: string[] = ['ap-guangzhou', 'ap-beijing', 'ap-shanghai'];

export { DEFAULT_CONFIG, REGION_LIST, COMPONENT_LIST, COMMON_CONFIGS };
