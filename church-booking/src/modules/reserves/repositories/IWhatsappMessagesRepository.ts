import ICreateWhatsappMessage from '../dtos/ICreateWhatsappMessageDTO';
import WhatsappMessage from '../infra/typeorm/entities/WhatsappMessage';

export default interface IReservesRepository {
  create(whatsappMessage: ICreateWhatsappMessage): Promise<WhatsappMessage>;
}
