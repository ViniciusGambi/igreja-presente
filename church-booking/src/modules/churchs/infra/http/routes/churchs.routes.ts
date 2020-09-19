import { Router } from 'express';
import ChurchsController from '../controllers/ChurchsController';

const churchsRouter = Router();

const churchsController = new ChurchsController();

churchsRouter.get('/:id', churchsController.get);
churchsRouter.post('/', churchsController.create);

export default churchsRouter;
