import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import authConfig from '../config/auth';
import Church from '../models/Church';

interface Request {
  user: string;
  password: string;
}

interface Response {
  church: Church;
  token: string;
}

class AuthenticateChurchService {
  public async execute({ user, password }: Request): Promise<Response> {
    const churchsRepository = getRepository(Church);

    const church = await churchsRepository.findOne({
      where: [{ id: user }, { email: user }],
    });

    if (!church) {
      throw new AppError('Invalid email/password combination.', 401);
    }

    const passwordMatched = await compare(password, church.password);

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
