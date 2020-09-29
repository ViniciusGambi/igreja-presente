import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';

interface IRequest {
  id: string;
  name: string;
  church_id: string;
  date: Date;
  max_reservations: number;
}

@injectable()
class UpdateEventService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    id,
    name,
    church_id,
    date,
    max_reservations,
  }: IRequest): Promise<Event> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new AppError('Event not exists');
    }

    const church = await this.churchsRepository.findById(church_id);

    if (!church) {
      throw new AppError('Church not exists');
    }

    const updatedEvent = await this.eventsRepository.save({
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

export default UpdateEventService;
