import common from './modules/common';
import app from './modules/app';
import faas from './modules/faas';
import apigw from './modules/apigw';
import guide from './modules/guide';
import website from './modules/website';
import cdn from './modules/cdn';

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

  // website
  ...website.en,

  // cdn
  ...cdn.en,
};
