const CODE_CONFIG = {
  type: 'object',
  keys: {
    src: {
      required: true,
      type: 'string',
      label: 'app.src.src',
      ui: 'Input',
    },
    // exclude: {
    //   required: false,
    //   type: 'array',
    //   label: 'app.src.exclude',
    //   ui: 'ExcludeInput',
    // },
  },
};

export { CODE_CONFIG };
