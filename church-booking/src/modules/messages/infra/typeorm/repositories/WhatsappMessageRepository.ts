import ICreateWhatsappMessage from '@modules/reserves/dtos/ICreateWhatsappMessageDTO';
import { getRepository, Repository } from 'typeorm';
import IWhatsappMessagesRepository from '../../../repositories/IWhatsappMessagesRepository';
import WhatsappMessage from '@modules/messages/infra/typeorm/entities/WhatsappMessage';

class WhatsappMessageRepository implements IWhatsappMessagesRepository {
  private ormRepository: Repository<WhatsappMessage>;

  constructor() {
    this.ormRepository = getRepository(WhatsappMessage);
  }

  public async findNotSent(): Promise<WhatsappMessage[]>{
    const messages = await this.ormRepository.find({ where: {sent: false}});
    return messages;
  }

  public async create({
    reserve_group
  }: ICreateWhatsappMessage): Promise<WhatsappMessage> {
    const message = this.ormRepository.create({ reserve_group });
    await this.ormRepository.save({...message, sent: false});

    return message;
  }

  public async save(whatsappMessage: WhatsappMessage): Promise<WhatsappMessage> {
    await this.ormRepository.save(whatsappMessage);
    return whatsappMessage;
  }
}

export default WhatsappMessageRepository;
