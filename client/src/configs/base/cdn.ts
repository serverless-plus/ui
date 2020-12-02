const CDN_AREA = ['mainland', 'overseas', 'global'];

const CDN_CONFIG = {
  domain: {
    required: true,
    type: 'string',
    label: 'cdn.domain',
    ui: 'Input',
  },
  area: {
    type: 'string',
    label: 'cdn.area',
    ui: 'Select',
    allows: CDN_AREA,
  },
  async: {
    type: 'boolean',
    label: 'cdn.async',
    ui: 'Switch',
    allows: [
      {
        value: true,
        label: 'enable',
      },
      {
        value: false,
        label: 'disable',
      },
    ],
  },
  https: {
    type: 'object',
    label: 'cdn.https',
    keys: {
      certInfo: {
        type: 'object',
        label: 'cdn.https.certInfo',
        keys: {
          certId: {
            type: 'string',
            label: 'cdn.https.certInfo.certId',
            ui: 'Input',
          },
        },
      },
      http2: {
        type: 'string',
        label: 'cdn.https.http2',
        ui: 'Switch',
        allows: [
          {
            value: 'on',
            label: 'enable',
          },
          {
            value: 'off',
            label: 'disable',
          },
        ],
      },
    },
  },
  forceRedirect: {
    type: 'object',
    label: 'cdn.forceRedirect',
    keys: {
      redirectType: {
        type: 'string',
        label: 'cdn.forceRedirect.redirectType',
        ui: 'Select',
        clearable: true,
        allows: ['https', 'http'],
      },
      redirectStatusCode: {
        type: 'number',
        label: 'cdn.forceRedirect.redirectStatusCode',
        ui: 'Select',
        clearable: true,
        allows: [301, 302],
      },
    },
  },
};

export { CDN_AREA, CDN_CONFIG };
