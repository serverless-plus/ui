import { Application } from 'express';
import * as slsController from '../controllers/sls';

const initRoutes = (app: Application): void => {
  app.get('/init', slsController.init);
  app.post('/generate', slsController.generate);
};

export { initRoutes };
