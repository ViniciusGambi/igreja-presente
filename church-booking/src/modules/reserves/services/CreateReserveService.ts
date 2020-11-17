import { inject, injectable } from 'tsyringe';
import Reserve from '@modules/reserves/infra/typeorm/entities/Reserve';
import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import IReservesRepository from '../repositories/IReservesRepository';
import IReserveGroupsRepository from '../repositories/IReserveGroupsRepository';
import IWhatsappMessagesRepository from '../../messages/repositories/IWhatsappMessagesRepository';

interface IRequest {
  whatsapp: string;
  event_id: string;
  names: string[];
}

@injectable()
class CreateReserveService {
  constructor(
    @inject('ReservesRepository')
    private reservesRepository: IReservesRepository,
    @inject('ReserveGroupsRepository')
    private reserveGroupsRepository: IReserveGroupsRepository,
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('WhatsappMessagesRepository')
    private whatsappMessageRepository: IWhatsappMessagesRepository,
  ) {}

  public async execute({ whatsapp, event_id, names }: IRequest): Promise<Reserve[]> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not exists');
    }

    const reserves = await this.reservesRepository.findByEventId(event_id);
    const eventReserves = reserves.length;

    /*const reserves = await this.reservesRepository.index();

    const eventReserves = reserves.filter(
      reserve => reserve.reserve_group.event_id === event_id,
    ).length;*/

    if (eventReserves + names.length > event.max_reservations) {
      throw new AppError(
        'You are trying to create more reserves than has available.',
      );
    }

    const reserveGroup = await this.reserveGroupsRepository.create({
      whatsapp,
      event_id,
    });

    const createdReserves = await Promise.all(
      names.map(async name => {
        const createdReserve = await this.reservesRepository.create({
          // reserve_group_id: reserveGroup.id,
          reserve_group: reserveGroup,
          name,
        });

        return createdReserve;
      }),
    );

    const message = await this.whatsappMessageRepository.create({
      reserve_group: reserveGroup
    });

    return createdReserves;
  }
}

export default CreateReserveService;
