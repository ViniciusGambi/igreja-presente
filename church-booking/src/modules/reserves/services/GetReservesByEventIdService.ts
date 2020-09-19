import { inject, injectable } from 'tsyringe';
import Reserve from '@modules/reserves/infra/typeorm/entities/Reserve';
import IReservesRepository from '../repositories/IReservesRepository';

@injectable()
class GetReservesByEventIdService {
  constructor(
    @inject('ReservesRepository')
    private reservesRepository: IReservesRepository,
  ) {}

  public async execute(event_id: string): Promise<Reserve[]> {
    const reserves = await this.reservesRepository.findByEventId(event_id);

    return reserves;
  }
}

export default GetReservesByEventIdService;
