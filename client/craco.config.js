const CracoLessPlugin = require('craco-less');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { whenDev, whenProd, when } = require('@craco/craco');

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
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        ...{
          filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
          chunkFilename: 'static/js/[name].js',
        },
      };

      // 关闭 devtool
      webpackConfig.devtool = false;

      // 配置 splitChunks
      webpackConfig.optimization.splitChunks = {
        ...webpackConfig.optimization.splitChunks,
        ...{
          chunks: 'async',
          name: true,
          minSize: 20000,
        },
      };

      // 覆盖已经内置的 plugin 配置
      webpackConfig.plugins.map((plugin) => {
        whenProd(() => {
          if (plugin instanceof MiniCssExtractPlugin) {
            Object.assign(plugin.options, {
              filename: 'static/css/[name].css',
              chunkFilename: 'static/css/[name].css',
            });
          }
        });
        return plugin;
      });

      return webpackConfig;
    },
  },
};
