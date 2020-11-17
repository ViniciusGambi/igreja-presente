import ICreateWhatsappMessage from '../../reserves/dtos/ICreateWhatsappMessageDTO';
import WhatsappMessage from '@modules/messages/infra/typeorm/entities/WhatsappMessage';

export default interface IWhatsappMessageRepository {
  findNotSent(): Promise<WhatsappMessage[]>;
  create(whatsappMessage: ICreateWhatsappMessage): Promise<WhatsappMessage>;
  save(whatsappMessage: WhatsappMessage): Promise<WhatsappMessage>;

}
