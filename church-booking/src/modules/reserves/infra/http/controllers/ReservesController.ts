import { Request, Response } from 'express';
import GetReservesByEventIdService from '@modules/reserves/services/GetReservesByEventIdService';
import { container } from 'tsyringe';
import UpdateReserveService from '@modules/reserves/services/UpdateReserveService';
import CreateReserveService from '@modules/reserves/services/CreateReserveService';

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
    const data = await createReserveService.execute({
      names,
      event_id,
    });

    /* try {
      const message = whatsapi.post('/messages', {
        text:
          'Você acaba de fazer a sua inscrição para a celebração no Sábado as 19h na Paróquia Sagrados Corações. Para confirmar a sua presença clique no link: http://ip.com/suareserva.',
        phone_number: whatsapp,
        token: 'tokenlegau',
      });
    } catch (err) {
      console.log(err);
    } */

    return response.json(data);
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
