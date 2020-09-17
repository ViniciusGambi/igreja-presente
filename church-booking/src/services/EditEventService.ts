import { getRepository } from 'typeorm';
import Event from '../models/Event';
import Church from '../models/Church';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  name: string;
  church_id: string;
  date: Date;
  max_reservations: number;
}

class EditEventService {
  public async execute({
    id,
    name,
    church_id,
    date,
    max_reservations,
  }: Request): Promise<Event> {
    const eventsRepository = getRepository(Event);
    const churchsRepository = getRepository(Church);

    const event = await eventsRepository.findOne({
      where: { id },
    });

    if (!event) {
      throw new AppError('Event not exists');
    }

    const church = await churchsRepository.findOne({
      where: { id: church_id },
    });

    if (!church) {
      throw new AppError('Church not exists');
    }

    if (church.id !== church_id) {
      throw new AppError(
        'User dont have permissions to edit an event for this church.',
      );
    }

    const updatedEvent = await eventsRepository.save({
      ...event,
      ...{
        name,
        church_id,
        date,
        max_reservations,
      },
    });

    return updatedEvent;
  }
}

export default EditEventService;
