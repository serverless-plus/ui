import websocket from './components/websocket';
import framework from './components/framework';

const COMPONENT_LIST = ['websocket', 'framework'];

const COMPONENTS = {
  // component: {
  //   type: 'string',
  //   label: 'Component',
  //   ui: 'Select',
  //   allows: ['websocket', 'framework'],
  // },
  name: {
    type: 'string',
    label: 'Name',
    description: 'Instance name',
    ui: 'Input',
  },
};

interface InitConfig {
  js: { [prop: string]: any };
  yaml: string;
}

interface Inputs {
  websocket: { [prop: string]: any };
  framework: { [prop: string]: any };
}

const INPUTS: Inputs = {
  websocket,
  framework,
};

const DEFAULT_CONFIG: InitConfig = {
  js: {
    component: 'websocket',
    name: 'websocket-demo',
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

export type ComponentName = keyof Inputs;

const getInputs = (component: ComponentName) => {
  return INPUTS[component];
};

export { COMPONENT_LIST, DEFAULT_CONFIG, COMPONENTS, getInputs };
