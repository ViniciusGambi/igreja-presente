import { Router } from 'express';
import reservesRouter from './reserves.routes';
import eventsRouter from './events.routes';
import churchsRouter from './churchs.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/reserves', reservesRouter);
routes.use('/events', eventsRouter);
routes.use('/churchs', churchsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
