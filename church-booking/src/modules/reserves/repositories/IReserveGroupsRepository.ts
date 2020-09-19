import ICreateReserveGroupDTO from '../dtos/ICreateReserveGroupDTO';
import ReserveGroup from '../infra/typeorm/entities/ReserveGroup';

export default interface IReserveGroupsRepository {
  create(id: ICreateReserveGroupDTO): Promise<ReserveGroup>;
}
