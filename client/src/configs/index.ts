import { Inputs } from '@/typings';
import { INPUTS, DEFAULT_CONFIGS } from './components';

export type ComponentName = keyof Inputs;

const getInputs = (component: ComponentName) => {
  return INPUTS[component];
};

const getDefaultConfigs = (component: ComponentName) => {
  return DEFAULT_CONFIGS[component];
};

export * from './common';
export { getInputs, getDefaultConfigs };
