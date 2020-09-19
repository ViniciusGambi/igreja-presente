import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Church from '../infra/typeorm/entities/Church';
import IChurchsRepository from '../repositories/IChurchsRepository';

@injectable()
class GetChurchService {
  constructor(
    @inject('ChurchsRepository')
    private churchsRepository: IChurchsRepository,
  ) {}

  public async execute(id: string): Promise<Church> {
    const church = await this.churchsRepository.findById(id);

    if (!church) {
      throw new AppError('Church not exists');
    }

    return church;
  }
}

export default GetChurchService;
