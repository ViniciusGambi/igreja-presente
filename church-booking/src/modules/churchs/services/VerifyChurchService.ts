import { injectable, inject } from 'tsyringe';
import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import IChurchsTokensRepository from '../repositories/IChurchTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
}

@injectable()
class VerifyChurchService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
    @inject('ChurchTokensRepository')
    private churchTokensRepository: IChurchsTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token }: IRequest): Promise<void> {
    const churchToken = await this.churchTokensRepository.findByToken(token);

    if (!churchToken) {
      throw new AppError('Church token does not exists');
    }

    const church = await this.churchsRepository.findById(churchToken.church_id);

    if (!church) {
      throw new AppError('Church does not exists');
    }

    const tokenCreatedAt = churchToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired');
    }

    church.active = true;

    await this.churchsRepository.save(church);

    await this.churchTokensRepository.delete(churchToken);
  }
}

export default VerifyChurchService;
