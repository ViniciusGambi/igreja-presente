import { Router } from 'express';
import ensureAuthenticated from '@modules/churchs/infra/http/middlewares/ensureAuthenticated';
import EventsController from '../controllers/EventsController';

const eventsRouter = Router();

const eventsController = new EventsController();

eventsRouter.get('/:id', eventsController.get);
eventsRouter.get('/churchs/:church_id', eventsController.listByChurch);
eventsRouter.post('/', ensureAuthenticated, eventsController.create);
eventsRouter.patch('/:id', ensureAuthenticated, eventsController.update);
eventsRouter.delete('/:id', eventsController.delete);

export default eventsRouter;
