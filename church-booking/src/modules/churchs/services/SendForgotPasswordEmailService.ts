import { injectable, inject } from 'tsyringe';
import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import path from 'path';
import IChurchTokensRepository from '../repositories/IChurchTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
    @inject('ChurchTokensRepository')
    private churchTokensRepository: IChurchTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<string> {
    const church = await this.churchsRepository.findByEmail(email);

    if (!church) {
      throw new AppError('Church does not exists');
    }

    const existentTokens = await this.churchTokensRepository.findByChurch(
      church.id,
    );

    const { token } =
      existentTokens?.length <= 0
        ? await this.churchTokensRepository.generate(church.id)
        : existentTokens[0];

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: church.name,
        email: church.email,
      },
      subject: '[Church] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: church.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });

    return token;
  }
}

export default SendForgotPasswordEmailService;
