import { injectable, inject } from 'tsyringe';
import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { addHours, isBefore } from 'date-fns';
import IChurchTokensRepository from '../repositories/IChurchTokensRepository';
import Church from '../infra/typeorm/entities/Church';

interface IRequest {
  church: Church;
}

@injectable()
class ResendVerifyChurchEmailService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
    @inject('ChurchTokensRepository')
    private churchTokensRepository: IChurchTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute(loggedChurch: Church): Promise<void> {
    const church = await this.churchsRepository.findById(loggedChurch.id);

    if (!church) {
      throw new AppError('Church does not exists');
    }

    const churchTokens = await this.churchTokensRepository.findByChurch(
      church.id,
    );

    const validChurchTokens = churchTokens.filter(token => {
      const compareDate = addHours(token.created_at, 2);
      return isBefore(Date.now(), compareDate);
    });

    const { token } =
      validChurchTokens.length > 0
        ? validChurchTokens[0]
        : await this.churchTokensRepository.generate(church.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'verify_account.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: church.name,
        email: church.email,
      },
      subject: '[Church] Verificação de Conta',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: church.name,
          link: `http://localhost:3000/verify_account?token=${token}`,
        },
      },
    });
  }
}

export default ResendVerifyChurchEmailService;
