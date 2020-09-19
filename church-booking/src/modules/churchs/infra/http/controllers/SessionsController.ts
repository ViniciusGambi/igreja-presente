import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateChurchService from '@modules/churchs/services/AuthenticateChurchService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { idOrEmail, password } = request.body;

    const authenticateChurchService = container.resolve(
      AuthenticateChurchService,
    );

    const { church, token } = await authenticateChurchService.execute({
      idOrEmail,
      password,
    });

    return response.json({ church, token });
  }
}

export default SessionsController;
