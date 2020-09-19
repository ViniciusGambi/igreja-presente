import { Router } from 'express';
import reservesRouter from '@modules/reserves/infra/http/routes/reserves.routes';
import eventsRouter from '@modules/events/infra/http/routes/events.routes';
import churchsRouter from '@modules/churchs/infra/http/routes/churchs.routes';
import sessionsRouter from '@modules/churchs/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/reserves', reservesRouter);
routes.use('/events', eventsRouter);
routes.use('/churchs', churchsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
