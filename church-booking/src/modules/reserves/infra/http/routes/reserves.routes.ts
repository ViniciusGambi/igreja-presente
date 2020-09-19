import { Router } from 'express';
import ensureAuthenticated from '@modules/churchs/infra/http/middlewares/ensureAuthenticated';
import ReservesController from '../controllers/ReservesController';

const reservesRouter = Router();
const reservesController = new ReservesController();

reservesRouter.get(
  '/:event_id',
  ensureAuthenticated,
  reservesController.listByEvent,
);

reservesRouter.post('/', reservesController.create);

reservesRouter.patch(
  '/:reserve_id',
  ensureAuthenticated,
  reservesController.updateReserve,
);

export default reservesRouter;
