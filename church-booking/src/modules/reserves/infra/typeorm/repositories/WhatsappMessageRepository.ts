import ICreateWhatsappMessage from '@modules/reserves/dtos/ICreateWhatsappMessageDTO';
import { getRepository, Repository } from 'typeorm';
import IWhatsappMessagesRepository from '../../../repositories/IWhatsappMessagesRepository';
import WhatsappMessage from '../entities/WhatsappMessage';

class WhatsappMessageRepository implements IWhatsappMessagesRepository {
  private ormRepository: Repository<WhatsappMessage>;

  constructor() {
    this.ormRepository = getRepository(WhatsappMessage);
  }

  public async create({
    reserve_group
  }: ICreateWhatsappMessage): Promise<WhatsappMessage> {
    const message = this.ormRepository.create({ reserve_group });
    await this.ormRepository.save(message);

    return message;
  }
}

export default WhatsappMessageRepository;
