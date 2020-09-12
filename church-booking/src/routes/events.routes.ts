import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateEventService from '../services/CreateEventService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Church from '../models/Church';
import Event from '../models/Event';
import Reserve from '../models/Reserve';
import AppError from '../errors/AppError';

const eventsRouter = Router();

eventsRouter.get(
  '/:church_id',
  async (request: Request, response: Response) => {
    const { church_id } = request.params;

    const churchsRepository = getRepository(Church);

    const church = await churchsRepository.findOne({
      where: { id: church_id },
    });

    if (!church) {
      throw new AppError('Church not exists');
    }

    const eventsRepository = getRepository(Event);
    const events = await eventsRepository.find({ where: { church_id } });

    const reservesRepository = getRepository(Reserve);
    const reserves = await reservesRepository.find();

    const eventsReturn = events.map(
      ({ id, name, date, max_reservations }: Event) => {
        const event_reserves = reserves.filter(
          reserve => reserve.reserve_group.event_id === id,
        ).length;
        return { id, name, date, event_reserves, max_reservations };
      },
    );
    return response.json(eventsReturn);
  },
);

eventsRouter.post(
  '/',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { name, date, max_reservations } = request.body;
    const church_id = request.user.id;
    const createEventService = new CreateEventService();
    const event = await createEventService.execute({
      name,
      date,
      church_id,
      max_reservations,
    });
    return response.json(event);
  },
);

export default eventsRouter;
