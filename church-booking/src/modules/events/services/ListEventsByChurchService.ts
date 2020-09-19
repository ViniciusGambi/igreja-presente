import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import IReservesRepository from '@modules/reserves/repositories/IReservesRepository';
import IEventsRepository from '../repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';

@injectable()
class ListEventsByChurchService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
    @inject('ReservesRepository')
    private reservesRepository: IReservesRepository,
  ) {}

  public async execute(church_id: string): Promise<Event[]> {
    const church = await this.churchsRepository.findById(church_id);

    if (!church) {
      throw new AppError('Church not exists');
    }

    const events = await this.eventsRepository.findByChurchId(church_id);

    const reserves = await this.reservesRepository.index();

    const eventsReturn = events.map(
      ({ id, name, date, max_reservations, ...rest }: Event) => {
        const event_reserves = reserves.filter(
          reserve => reserve.reserve_group.event_id === id,
        ).length;
        return { id, name, date, event_reserves, max_reservations, ...rest };
      },
    );

    return eventsReturn;
  }
}

export default ListEventsByChurchService;
