import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import Church from '../infra/typeorm/entities/Church';
import IChurchsRepository from '../repositories/IChurchsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IChurchTokensRepository from '../repositories/IChurchTokensRepository';

interface IRequest {
  id: string;
  name: string;
  url: string;
  email: string;
  password: string;
  color: string;
}

@injectable()
class CreateChurchService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('ChurchTokensRepository')
    private churchTokensRepository: IChurchTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    id,
    name,
    url,
    email,
    password,
    color,
  }: IRequest): Promise<Church> {
    const emailExists = await this.churchsRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const church = await this.churchsRepository.create({
      id,
      name,
      url,
      email,
      password: hashedPassword,
      color
    });

    const { token } = await this.churchTokensRepository.generate(church.id);

    /* const forgotPasswordTemplate = path.resolve(
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
    }); */

    return church;
  }
}

export default CreateChurchService;
