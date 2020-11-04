import { Request, Response } from 'express';
import { container } from 'tsyringe';
import VerifyChurchService from '@modules/churchs/services/VerifyChurchService';

class VerificationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.body;

    const verifyChurchService = container.resolve(VerifyChurchService);

    await verifyChurchService.execute({
      token,
    });

    return response.status(204).json();
  }
}

export default VerificationController;
