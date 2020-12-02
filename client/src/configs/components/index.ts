import { AnyObject } from '@/typings';
import * as framework from './framework';
import * as websocket from './websocket';
import * as scf from './scf';
import * as website from './website';

const INPUTS: AnyObject = {
  scf: scf.parameters,
  website: website.parameters,
  framework: framework.parameters,
  websocket: websocket.parameters,
};

const DEFAULT_CONFIGS: AnyObject = {
  scf: scf.defaultConfigs,
  website: website.defaultConfigs,
  framework: framework.defaultConfigs,
  websocket: websocket.defaultConfigs,
};

export { INPUTS, DEFAULT_CONFIGS };
