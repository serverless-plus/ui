import common from './modules/common';
import app from './modules/app';
import faas from './modules/faas';
import apigw from './modules/apigw';
import guide from './modules/guide';

export default {
  // common
  ...common.zh,

  // app
  ...app.zh,

  // faas
  ...faas.zh,

  // apigw
  ...apigw.zh,

  // guide
  ...guide.zh,
};
