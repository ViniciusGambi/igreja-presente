import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';

@injectable()
class GetEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id: string): Promise<Event> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new AppError('Event not exists');
    }

    return event;
  }
}

export default GetEventService;
