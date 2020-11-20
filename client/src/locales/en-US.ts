import common from './modules/common';
import app from './modules/app';
import faas from './modules/faas';
import apigw from './modules/apigw';
import guide from './modules/guide';

export default {
  // common
  ...common.en,

  // app
  ...app.en,

  // faas
  ...faas.en,

  // apigw
  ...apigw.en,

  // guide
  ...guide.en,
};
