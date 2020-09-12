import { getRepository } from 'typeorm';
import ReserveGroup from '../models/ReserveGroup';
import Reserve from '../models/Reserve';
import Event from '../models/Event';
import AppError from '../errors/AppError';

interface Request {
  event_id: string;
  names: string[];
}

class CreateReserveService {
  public async execute({ event_id, names }: Request) {
    const eventsRepository = getRepository(Event);
    const event = await eventsRepository.findOne({ where: { id: event_id } });

    if (!event) {
      throw new AppError('Event not exists');
    }

    const reservesRepository = getRepository(Reserve);
    const reserves = await reservesRepository.find();

    const eventReserves = reserves.filter(
      reserve => reserve.reserve_group.event_id === event_id,
    ).length;

    if (eventReserves + names.length > event.max_reservations) {
      throw new AppError(
        'You are trying to create more reserves than has available.',
      );
    }

    const reserveGroupsRepository = getRepository(ReserveGroup);
    const reserveGroup = await reserveGroupsRepository.create({ event_id });
    await reserveGroupsRepository.save(reserveGroup);

    const createdReserves = await Promise.all(
      names.map(async name => {
        const createdReserve = await reservesRepository.create({
          reserve_group_id: reserveGroup.id,
          name,
        });
        await reservesRepository.save(createdReserve);
        return createdReserve;
      }),
    );

    return { reserveGroup, reserves: createdReserves };
  }
}

export default CreateReserveService;
