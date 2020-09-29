import { getRepository, Repository } from 'typeorm';
import ICreateReserveDTO from '@modules/reserves/dtos/ICreateReserveDTO';
import IReservesRepository from '@modules/reserves/repositories/IReservesRepository';
import Reserve from '../entities/Reserve';

class ReservesRepository implements IReservesRepository {
  private ormRepository: Repository<Reserve>;

  constructor() {
    this.ormRepository = getRepository(Reserve);
  }

  public async index(): Promise<Reserve[]> {
    const finded = await this.ormRepository.find();
    return finded;
  }

  public async findById(id: string): Promise<Reserve | undefined> {
    const finded = await this.ormRepository.findOne({
      where: { id },
    });

    return finded;
  }

  public async findByEventId(event_id: string): Promise<Reserve[]> {
    const reserves = await this.ormRepository
      .createQueryBuilder('reserves')
      .innerJoinAndSelect('reserves.reserve_group', 'reserve_group')
      .where('reserve_group.event_id = :event_id', { event_id })
      .getMany();

    return reserves;
  }

  public async create({
    reserve_group,
    name,
  }: ICreateReserveDTO): Promise<Reserve> {
    const reserve = await this.ormRepository.create({ reserve_group, name });
    await this.ormRepository.save(reserve);

    return reserve;
  }

  public async save(reserve: Reserve): Promise<Reserve> {
    const updatedReserve = await this.ormRepository.save(reserve);
    return updatedReserve;
  }
}

export default ReservesRepository;
