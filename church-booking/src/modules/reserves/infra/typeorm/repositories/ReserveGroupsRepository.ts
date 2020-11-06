import { getRepository, Repository } from 'typeorm';
import ICreateReserveGroupDTO from '@modules/reserves/dtos/ICreateReserveGroupDTO';
import IReserveGroupsRepository from '@modules/reserves/repositories/IReserveGroupsRepository';
import ReserveGroup from '../entities/ReserveGroup';

class ReserveGroupRepository implements IReserveGroupsRepository {
  private ormRepository: Repository<ReserveGroup>;

  constructor() {
    this.ormRepository = getRepository(ReserveGroup);
  }

  public async create({
    whatsapp,
    event_id,
  }: ICreateReserveGroupDTO): Promise<ReserveGroup> {
    const reserveGroup = this.ormRepository.create({ whatsapp, event_id });
    await this.ormRepository.save(reserveGroup);

    return reserveGroup;
  }
}

export default ReserveGroupRepository;
