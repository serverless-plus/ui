import { deepClone } from '@/utils';

const BASE_FAAS_CONFIG = {
  type: 'object',
  label: 'faas.options',
  divider: true,
  keys: {
    name: {
      required: false,
      type: 'string',
      label: 'faas.name',
      ui: 'Input',
      regex: /^[A-Za-z][\w-]{0,58}[A-Za-z0-9]$/g,
    },
    role: {
      type: 'string',
      label: 'faas.role',
      ui: 'Input',
    },
    runtime: {
      type: 'string',
      label: 'faas.runtime',
      ui: 'Select',
      default: 'Nodejs10.15',
      allows: ['Nodejs12.16', 'Nodejs10.15', 'Nodejs8.9', 'Nodejs6.10'],
    },
    memorySize: {
      type: 'number',
      ui: 'Select',
      label: 'faas.memorySize',
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
      label: 'faas.environments',
      ui: 'EnvInput',
      default: [],
    },
    timeout: {
      type: 'number',
      label: 'faas.timeout',
      ui: 'InputNumber',
      default: 3,
    },
    vpc: {
      type: 'vpc',
      label: 'faas.vpc',
      // ui: 'VpcSelect',
      dependField: 'inputs.region',
      ui: 'VpcInput',
      default: {},
    },
    publicAccess: {
      type: 'boolean',
      label: 'faas.publicAccess',
      ui: 'Radio',
      allows: [
        {
          label: 'yes',
          value: true,
        },
        {
          label: 'no',
          value: false,
        },
      ],
    },
    eip: {
      type: 'boolean',
      label: 'faas.eip',
      ui: 'Radio',
      allows: [
        {
          label: 'yes',
          value: true,
        },
        {
          label: 'no',
          value: false,
        },
      ],
    },
    cls: {
      type: 'cls',
      label: 'faas.cls',
      ui: 'ClsInput',
      default: {},
    },
    tags: {
      type: 'array',
      label: 'faas.tags',
      ui: 'TagInput',
      default: [],
    },
    layers: {
      type: 'array',
      label: 'faas.layers',
      ui: 'LayerInput',
      default: [],
    },
    cfs: {
      type: 'array',
      label: 'faas.cfs',
      ui: 'CfsInput',
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

const CFS_CONFIG = {
  cfsId: {
    type: 'string',
    label: 'faas.cfs.cfsId',
    ui: 'Input',
    required: true,
  },
  mountInsId: {
    type: 'string',
    label: 'faas.cfs.mountInsId',
    ui: 'Input',
    required: true,
  },
  localMountDir: {
    type: 'string',
    label: 'faas.cfs.localMountDir',
    ui: 'Input',
  },
  remoteMountDir: {
    type: 'string',
    label: 'faas.cfs.remoteMountDir',
    ui: 'Input',
  },
};

export { BASE_FAAS_CONFIG, FAAS_CONFIG, CFS_CONFIG };
