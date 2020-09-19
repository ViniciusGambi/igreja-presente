import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IEventsRepository from '../repositories/IEventsRepository';

@injectable()
class DeleteEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const event = await this.eventsRepository.findById(id);

    if (!event) {
      throw new AppError('Event not exists');
    }

    await this.eventsRepository.delete(event);
  }
}

export default DeleteEventService;
