import { Router } from 'express';
import ChurchsController from '../controllers/ChurchsController';
import VerificationController from '../controllers/VerificationController';

const churchsRouter = Router();

const churchsController = new ChurchsController();
const verificationController = new VerificationController();

churchsRouter.get('/:id', churchsController.get);
churchsRouter.post('/', churchsController.create);
churchsRouter.post('/verificate', verificationController.create);

export default churchsRouter;
