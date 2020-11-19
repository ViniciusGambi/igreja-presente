import Reserve from "@modules/reserves/infra/typeorm/entities/Reserve";
import IReservesRepository from "@modules/reserves/repositories/IReservesRepository";
import { getFormatedDate, getWeekDay } from "@shared/utils/date";
import { inject, injectable } from "tsyringe";
import whatsapi from "../infra/providers/WhatsApi/whatsapi";
import IWhatsappMessagesRepository from '../repositories/IWhatsappMessagesRepository';


@injectable()
class PostNotSentMessagesService {
  constructor(
    @inject('WhatsappMessagesRepository')
    private whatsappMessagesRepository: IWhatsappMessagesRepository,
    @inject('ReservesRepository')
    private reservesRepository: IReservesRepository,
  ) {}

  public async execute() {
    const messages = await this.whatsappMessagesRepository.findNotSent();

    (await messages).forEach(async (message) => {
      let content = `Oii! Está tudo certo com a sua reserva para o ${message.reserve_group.event.name} do ${message.reserve_group.event.church.name} de ${getWeekDay(message.reserve_group.event.date.toString())} dia ${getFormatedDate(message.reserve_group.event.date.toString())}! Uhuuul! Caso aconteça algum imprevisto só chamar aqui que desmarcamos e liberamos sua reserva para outra pessoa. Até lá!\n\n *As reservas que você fez:*`;

      const reserves = await this.reservesRepository.findByReserveGroupId(message.reserve_group_id);
      const names = reserves.map((reserve: Reserve) => reserve.name);

      for (let i in names){
        content += (`\n- ${names[i]}`);
      }

      try {
        const response = await whatsapi.post('/sendText', {
          "args": {
              "to": `${message.reserve_group.whatsapp}@c.us`,
              "content": content,
          }
        });
      } catch (err) {}
      this.whatsappMessagesRepository.save({...message, sent: true});
    })
  }

}

export default PostNotSentMessagesService;
