import ICreateReserveDTO from '../dtos/ICreateReserveDTO';
import Reserve from '../infra/typeorm/entities/Reserve';

export default interface IReservesRepository {
  index(): Promise<Reserve[]>;
  findById(id: string): Promise<Reserve | undefined>;
  findByEventId(event_id: string): Promise<Reserve[]>;
  create(reserve: ICreateReserveDTO): Promise<Reserve>;
  save(reserve: Reserve): Promise<Reserve>;
}
