import { Router } from 'express';

import SessionController from './controllers/SessionController';
import GetNewTokenController from './controllers/GetNewTokenController';
import authMiddleware from './middlewares/auth';
import SalesController from './controllers/SalesController';
import PaymentsController from './controllers/PaymentsController';
import SalesOfTheDayController from './controllers/SalesOfTheDayController';

const routes = Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/newtoken', GetNewTokenController.store);

routes.post('/sales', SalesController.create);
routes.get('/sales', SalesController.index);
routes.delete('/sales/:id', SalesController.delete);

routes.post('/payments', PaymentsController.create);
routes.get('/payments', PaymentsController.index);
routes.delete('/payments/:id', PaymentsController.delete);

routes.get('/pre_sales_day', SalesOfTheDayController.store);
routes.post('/sales_day', SalesOfTheDayController.create);
routes.get('/sales_day', SalesOfTheDayController.index);

export default routes;
