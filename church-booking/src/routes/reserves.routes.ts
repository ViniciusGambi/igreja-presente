import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateReserveService from '../services/CreateReserveService';
import Reserve from '../models/Reserve';
import whatsapi from '../utilsServices/whatsapi';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppError from '../errors/AppError';

const reservesRouter = Router();

reservesRouter.get(
  '/:eventId',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { eventId } = request.params;
    const reservesRepository = getRepository(Reserve);
    const reserves = await reservesRepository
      .createQueryBuilder('reserves')
      .innerJoinAndSelect('reserves.reserve_group', 'reserve_group')
      .where('reserve_group.event_id = :eventId', { eventId })
      .getMany();

    return response.json(reserves);
  },
);

reservesRouter.patch(
  '/:reserveId',
  ensureAuthenticated,
  async (request: Request, response: Response) => {
    const { reserveId } = request.params;
    const { presence } = request.body;
    const reservesRepository = getRepository(Reserve);
    const reserve = await reservesRepository.findOne({
      where: { id: reserveId },
    });

    if (!reserve) {
      throw new AppError('Reserve not exists');
    }
    const updatedReserve = await reservesRepository.save({
      ...reserve,
      presence,
    });

    return response.json(updatedReserve);
  },
);

reservesRouter.post('/', async (request: Request, response: Response) => {
  const { event_id, names, whatsapp } = request.body;
  const createReserveService = new CreateReserveService();
  const data = await createReserveService.execute({
    names,
    event_id,
  });

  try {
    const message = whatsapi.post('/messages', {
      text:
        'Você acaba de fazer a sua inscrição para a celebração no Sábado as 19h na Paróquia Sagrados Corações. Para confirmar a sua presença clique no link: http://ip.com/suareserva.',
      phone_number: whatsapp,
      token: 'tokenlegau',
    });
  } catch (err) {
    console.log(err);
  }

  return response.json(data);
});

export default reservesRouter;
