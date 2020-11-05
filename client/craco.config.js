const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'primary-color': '#006eff',
              'primary-1': '#006eff',
              'layout-header-background': '#262F3E',
              'link-color': '#006eff',
              'border-radius-base': '0px',
              'layout-header-color': '#FFFFFF',
              'select-item-selected-color': '#FFFFFF',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
