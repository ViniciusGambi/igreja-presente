import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateChurchService from '../services/CreateChurchService';
import Church from '../models/Church';

const churchsRouter = Router();

churchsRouter.get('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;
  const churchsRepository = getRepository(Church);
  const church = await churchsRepository.findOne({ where: { id } });
  return response.json(church);
});

churchsRouter.get('/', async (request: Request, response: Response) => {
  const churchsRepository = getRepository(Church);
  const churchs = await churchsRepository.find();
  return response.json(churchs);
});

churchsRouter.post('/', async (request: Request, response: Response) => {
  const { id, name, url, email, password } = request.body;
  const createChurchService = new CreateChurchService();
  const church = await createChurchService.execute({
    id,
    name,
    url,
    email,
    password,
  });
  return response.json(church);
});

export default churchsRouter;
