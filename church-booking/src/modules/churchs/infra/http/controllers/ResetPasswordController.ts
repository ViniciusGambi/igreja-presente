import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/churchs/services/ResetPasswordService';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetForgotPasswordService = container.resolve(ResetPasswordService);

    await resetForgotPasswordService.execute({
      token,
      password,
    });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
