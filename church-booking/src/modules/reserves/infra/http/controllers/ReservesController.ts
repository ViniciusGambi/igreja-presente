import { Request, Response } from 'express';
import GetReservesByEventIdService from '@modules/reserves/services/GetReservesByEventIdService';
import { container } from 'tsyringe';
import UpdateReserveService from '@modules/reserves/services/UpdateReserveService';
import CreateReserveService from '@modules/reserves/services/CreateReserveService';
import whatsapi from '@shared/container/providers/WhatsApi/whatsapi';

class ReservesController {
  public async listByEvent(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { event_id } = request.params;
    const getReservesByEventIdService = container.resolve(
      GetReservesByEventIdService,
    );
    const reserves = await getReservesByEventIdService.execute(event_id);
    return response.json(reserves);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { event_id, names, whatsapp } = request.body;
    const createReserveService = container.resolve(CreateReserveService);
    const reserve = await createReserveService.execute({
      names,
      event_id,
      whatsapp
    });

    let content = `Oii! Está tudo okk com a sua reserva para o grupão de domingo! Uhuuul! Caso aconteça algum imprevisto só chamar aqui que desmarcamos e liberamos sua reserva para outra pessoa. Até lá!\n\n *As reservas que você fez:*`;

    for (let i in names){
      content += (`\n- ${names[i]}`);
    }

    try {
      const message = whatsapi.post('/sendText', {
        "args": {
            "to": `${whatsapp}@c.us`,
            "content": content,
        }
      });
    } catch (err) {
      console.log(err);
    }

    return response.json(reserve);
  }

  public async updateReserve(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { reserve_id } = request.params;
    const { presence } = request.body;

    const updateReserveService = container.resolve(UpdateReserveService);
    const updatedReserve = await updateReserveService.execute({
      reserve_id,
      presence,
    });

    return response.json(updatedReserve);
  }
}

export default ReservesController;
