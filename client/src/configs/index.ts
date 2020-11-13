import { Inputs } from './typings';
import * as INPUTS from './components';

export type ComponentName = keyof Inputs;

const getInputs = (component: ComponentName) => {
  return INPUTS[component];
};

export * from './common';
export { getInputs };
