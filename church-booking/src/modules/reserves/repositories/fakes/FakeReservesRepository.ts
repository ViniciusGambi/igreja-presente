import ICreateReserveDTO from '@modules/reserves/dtos/ICreateReserveDTO';
import IReservesRepository from '@modules/reserves/repositories/IReservesRepository';
import Reserve from '@modules/reserves/infra/typeorm/entities/Reserve';
import { uuid } from 'uuidv4';

class FakeReservesRepository implements IReservesRepository {
  private reserves: Reserve[] = [];

  public async index(): Promise<Reserve[]> {
    return this.reserves;
  }

  public async findById(id: string): Promise<Reserve | undefined> {
    const finded = this.reserves.find(reserve => reserve.id === id);

    return finded;
  }

  public async findByReserveGroupId(reserve_group_id: string): Promise<Reserve[]>{
    const reserves = this.reserves.filter(
      reserve => reserve.reserve_group_id === reserve_group_id,
    );
    return reserves;
  }

  public async findByEventId(event_id: string): Promise<Reserve[]> {
    const reserves = this.reserves.filter(
      reserve => reserve.reserve_group.event_id === event_id,
    );
    return reserves;
  }

  public async create({
    reserve_group,
    name,
  }: ICreateReserveDTO): Promise<Reserve> {
    const reserve = new Reserve();

    Object.assign(reserve, {
      id: uuid(),
      reserve_group,
      reserve_group_id: reserve_group.id,
      name,
      presence: false,
    });

    this.reserves.push(reserve);

    return reserve;
  }

  public async save(reserve: Reserve): Promise<Reserve> {
    const findedIndex = this.reserves.findIndex(rsv => rsv.id === reserve.id);
    this.reserves[findedIndex] = reserve;

    return reserve;
  }
}

export default FakeReservesRepository;
