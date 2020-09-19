import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';

interface IRequest {
  name: string;
  church_id: string;
  date: Date;
  max_reservations: number;
}

@injectable()
class CreateEventService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    name,
    church_id,
    date,
    max_reservations,
  }: IRequest): Promise<Event> {
    const church = await this.churchsRepository.findById(church_id);

    if (!church) {
      throw new AppError('Church not exists');
    }

    if (church.id !== church_id) {
      throw new AppError(
        'User dont have permissions to create an event for this church.',
      );
    }

    const event = await this.eventsRepository.create({
      name,
      church_id,
      date,
      max_reservations,
    });

    return event;
  }
}

export default CreateEventService;
