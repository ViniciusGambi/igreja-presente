import { Router } from 'express';
import AuthenticateChurchService from '../services/AuthenticateChurchService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { user, password } = request.body;

  const authenticateChurchService = new AuthenticateChurchService();

  const { church, token } = await authenticateChurchService.execute({
    user,
    password,
  });

  return response.json({ church, token });
});

export default sessionsRouter;
