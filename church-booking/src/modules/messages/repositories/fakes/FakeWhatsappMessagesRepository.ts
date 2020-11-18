import { uuid } from 'uuidv4';
import IWhatsappMessagesRepository from '../IWhatsappMessagesRepository';
import WhatsappMessage from '@modules/messages/infra/typeorm/entities/WhatsappMessage';
import ICreateWhatsappMessage from '@modules/reserves/dtos/ICreateWhatsappMessageDTO';

class FakeWhatsappMessagesRepository implements IWhatsappMessagesRepository {
  private whatsappMessages: WhatsappMessage[] = [];

  public async findNotSent(): Promise<WhatsappMessage[]>{
    const messages = this.whatsappMessages.filter(message => message.sent === false)
    return messages;
  }

  public async create({
    reserve_group,
  }: ICreateWhatsappMessage): Promise<WhatsappMessage> {
    const message = new WhatsappMessage();
    Object.assign(message, { id: uuid(), reserve_group });

    this.whatsappMessages.push(message);

    return message;
  }

  public async save(message: WhatsappMessage): Promise<WhatsappMessage> {
    const findedIndex = this.whatsappMessages.findIndex(msg => msg.id === message.id);
    this.whatsappMessages[findedIndex] = message;

    return message;
  }
}

export default FakeWhatsappMessagesRepository;
