import { Application } from 'express';
import * as slsController from '../controllers/sls';
import * as VpcController from '../controllers/vpc';

const initRoutes = (app: Application): void => {
  app.get('/init', slsController.init);
  app.post('/generate', slsController.generate);

  // get
  app.get('/vpc', VpcController.vpcList);
  app.get('/subnet', VpcController.subnetList);
};

export { initRoutes };
