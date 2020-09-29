import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import Church from '../infra/typeorm/entities/Church';
import IChurchsRepository from '../repositories/IChurchsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  idOrEmail: string;
  password: string;
}

interface IResponse {
  church: Church;
  token: string;
}

@injectable()
class AuthenticateChurchService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ idOrEmail, password }: IRequest): Promise<IResponse> {
    const church = await this.churchsRepository.findByIdOrEmail(idOrEmail);

    if (!church) {
      throw new AppError('Invalid email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      church.password,
    );

    if (!passwordMatched) {
      throw new AppError('Invalid email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: church.id,
      expiresIn,
    });

    return {
      church,
      token,
    };
  }
}

export default AuthenticateChurchService;
