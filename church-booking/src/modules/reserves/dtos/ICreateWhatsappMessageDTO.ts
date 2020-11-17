import ReserveGroup from '../infra/typeorm/entities/ReserveGroup';

export default interface ICreateWhatsappMessage {
  reserve_group: ReserveGroup;
}
