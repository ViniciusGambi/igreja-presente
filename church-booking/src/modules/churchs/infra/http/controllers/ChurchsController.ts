import CreateChurchService from '@modules/churchs/services/CreateChurchService';
import GetChurchService from '@modules/churchs/services/GetChurchService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ChurchsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id, name, url, email, password } = request.body;

    const createChurchService = container.resolve(CreateChurchService);
    const church = await createChurchService.execute({
      id,
      name,
      url,
      email,
      password,
    });
    return response.json(church);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getChurchService = container.resolve(GetChurchService);
    const church = await getChurchService.execute(id);
    return response.json(church);
  }
}

export default ChurchsController;
