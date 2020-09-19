import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Reserve from '../infra/typeorm/entities/Reserve';
import IReservesRepository from '../repositories/IReservesRepository';

interface IRequest {
  reserve_id: string;
  presence: boolean;
}

@injectable()
class UpdateReserveService {
  constructor(
    @inject('ReservesRepository')
    private reservesRepository: IReservesRepository,
  ) {}

  public async execute({ reserve_id, presence }: IRequest): Promise<Reserve> {
    const reserve = await this.reservesRepository.findById(reserve_id);

    if (!reserve) {
      throw new AppError('Reserve not exists.');
    }

    const updatedReserve = await this.reservesRepository.save({
      ...reserve,
      presence,
    });

    return updatedReserve;
  }
}

export default UpdateReserveService;
