import ReserveGroup from '../infra/typeorm/entities/ReserveGroup';

export default interface ICreateReserveDTO {
  reserve_group: ReserveGroup;
  name: string;
}
