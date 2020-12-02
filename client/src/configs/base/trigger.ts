import { TriggerConfigs } from '@/typings';
const TRIGGER_CONFIG: TriggerConfigs = {
  timer: {
    qualifier: {
      type: 'string',
      label: 'faas.trigger.qualifier',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.qualifier.required',
    },
    name: {
      type: 'string',
      label: 'faas.trigger.timer.name',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.timer.name.required',
    },
    cronExpression: {
      type: 'string',
      label: 'faas.trigger.timer.cron',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.timer.cron.required',
    },
    argument: {
      type: 'string',
      label: 'faas.trigger.timer.argument',
      ui: 'TextArea',
    },
    enable: {
      type: 'boolean',
      label: 'faas.trigger.enable',
      ui: 'Switch',
      allows: [
        {
          label: 'enable',
          value: true,
        },
        {
          label: 'disable',
          value: false,
        },
      ],
    },
  },
  cos: {
    qualifier: {
      type: 'string',
      label: 'faas.trigger.qualifier',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.qualifier.required',
    },
    bucket: {
      type: 'string',
      label: 'faas.trigger.cos.bucket',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.cos.bucket.required',
    },
    filter: {
      type: 'object',
      keys: {
        prefix: {
          type: 'string',
          label: 'faas.trigger.cos.filter.prefix',
          ui: 'Input',
        },
        suffix: {
          type: 'string',
          label: 'faas.trigger.cos.filter.suffix',
          ui: 'Input',
        },
      },
    },
    events: {
      type: 'string',
      label: 'faas.trigger.cos.events',
      ui: 'Select',
      required: true,
      requiredMsg: 'faas.trigger.timer.events.required',
      placeholder: 'faas.trigger.cos.events.input',
      allows: [
        'cos:ObjectCreated:*',
        'cos:ObjectCreated:Put',
        'cos:ObjectCreated:Post',
        'cos:ObjectCreated:Copy',
        'cos:ObjectCreated:CompleteMultipartUpload',
        'cos:ObjectCreated:Origin',
        'cos:ObjectCreated:Replication',
        'cos:ObjectRemove:*',
        'cos:ObjectRemove:Delete',
        'cos:ObjectRemove:DeleteMarkerCreated',
        'cos:ObjectRestore:Post',
        'cos:ObjectRestore:Completed',
      ],
    },
    enable: {
      type: 'boolean',
      label: 'faas.trigger.enable',
      ui: 'Switch',
      allows: [
        {
          label: 'enable',
          value: true,
        },
        {
          label: 'disable',
          value: false,
        },
      ],
    },
  },
  apigw: {
    qualifier: {
      type: 'string',
      label: 'faas.trigger.qualifier',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.timer.qualifier.required',
    },
    name: {
      type: 'string',
      label: 'apigw.name',
      ui: 'Input',
      regex: /^[a-zA-Z][a-zA-Z0-9(_)]{0,48}[a-zA-Z0-9]?$/g,
    },
    description: {
      type: 'string',
      label: 'apigw.description',
      ui: 'Input',
    },
    protocols: {
      type: 'array',
      label: 'apigw.protocols',
      ui: 'MultiSelect',
      default: ['http'],
      allows: ['http', 'https'],
      required: true,
      requiredMsg: 'apigw.protocols.required',
    },
    environment: {
      type: 'string',
      label: 'apigw.environment',
      ui: 'Select',
      default: 'release',
      allows: ['release', 'prepub', 'test'],
      required: true,
      requiredMsg: 'apigw.environment.required',
    },
    netTypes: {
      type: 'array',
      label: 'apigw.netTypes',
      ui: 'MultiSelect',
      default: ['OUTER'],
      allows: ['OUTER', 'INNER'],
      required: true,
      requiredMsg: 'apigw.netTypes.required',
    },

    id: {
      type: 'string',
      label: 'apigw.id',
      ui: 'Input',
    },
    apis: {
      type: 'array',
      label: 'apigw.apiList',
      ui: 'ApiInput',
      default: [],
      editable: false,
    },
  },
  ckafka: {
    qualifier: {
      type: 'string',
      label: 'faas.trigger.qualifier',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.qualifier.required',
    },
    name: {
      type: 'string',
      label: 'faas.trigger.ckafka.name',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.ckafka.name.required',
    },
    topic: {
      type: 'string',
      label: 'faas.trigger.ckafka.topic',
      ui: 'Input',
      required: true,
      requiredMsg: 'faas.trigger.ckafka.topic.required',
    },
    maxMsgNum: {
      type: 'number',
      label: 'faas.trigger.ckafka.maxMsgNum',
      ui: 'InputNumber',
    },
    offset: {
      type: 'string',
      label: 'faas.trigger.ckafka.offset',
      ui: 'Select',
      allows: ['latest'],
    },
    retry: {
      type: 'number',
      label: 'faas.trigger.ckafka.retry',
      ui: 'InputNumber',
    },
    enable: {
      type: 'boolean',
      label: 'faas.trigger.enable',
      ui: 'Switch',
      allows: [
        {
          label: 'enable',
          value: true,
        },
        {
          label: 'disable',
          value: false,
        },
      ],
    },
  },
};

const TRIGGER_DEFAULT_CONFIGS: TriggerConfigs = {
  timer: {
    qualifier: '$DEFAULT',
    name: 'timer',
    cronExpression: '0 */5 * * * * *',
    argument: '',
    enable: true,
  },
  cos: {
    qualifier: '$DEFAULT',
    enable: true,
    filter: {
      suffix: '',
      prefix: '',
    },
    events: 'cos:ObjectCreated:*',
  },
  apigw: {
    qualifier: '$DEFAULT',
    name: 'SCF_API_SERVICE',
    enable: true,
    evironment: 'release',
    protocols: ['http', 'https'],
    netTypes: ['OUTER'],
    description: 'Created by Serverless Component',
    apis: [
      {
        path: '/',
        method: 'ANY',
      },
    ],
  },
  ckafka: {
    qualifier: '$DEFAULT',
    enable: true,
    maxMsgNum: 100,
    offset: 'latest',
    retry: 10000,
  },
  cmq: {},
};

const TRIGGER_TYPES = ['timer', 'cos', 'apigw', 'ckafka', 'cmq'];

export { TRIGGER_DEFAULT_CONFIGS, TRIGGER_CONFIG, TRIGGER_TYPES };
