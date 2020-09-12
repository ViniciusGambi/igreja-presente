import { getRepository } from 'typeorm';
import Event from '../models/Event';
import Church from '../models/Church';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  church_id: string;
  date: Date;
  max_reservations: number;
}

class CreateEventService {
  public async execute({
    name,
    church_id,
    date,
    max_reservations,
  }: Request): Promise<Event> {
    const churchsRepository = getRepository(Church);

    const church = await churchsRepository.findOne({
      where: { id: church_id },
    });

    if (!church) {
      throw new AppError('Church not exists');
    }

    if (church.id !== church_id) {
      throw new AppError(
        'User dont have permissions to create an event for this church.',
      );
    }

    const eventsRepository = getRepository(Event);
    const event = await eventsRepository.create({
      name,
      church_id,
      date,
      max_reservations,
    });

    await eventsRepository.save(event);

    return event;
  }
}

export default CreateEventService;
