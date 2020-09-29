import ReserveGroup from '@modules/reserves/infra/typeorm/entities/ReserveGroup';
import ICreateReserveGroupDTO from '@modules/reserves/dtos/ICreateReserveGroupDTO';
import { uuid } from 'uuidv4';
import IReserveGroupsRepository from '../IReserveGroupsRepository';

class FakeReserveGroupsRepository implements IReserveGroupsRepository {
  private reserveGroups: ReserveGroup[] = [];

  public async create({
    event_id,
  }: ICreateReserveGroupDTO): Promise<ReserveGroup> {
    const reserveGroup = new ReserveGroup();
    Object.assign(reserveGroup, { id: uuid(), event_id });

    this.reserveGroups.push(reserveGroup);

    return reserveGroup;
  }
}

export default FakeReserveGroupsRepository;
