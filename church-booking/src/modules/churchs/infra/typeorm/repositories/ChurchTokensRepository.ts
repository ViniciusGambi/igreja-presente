import { getRepository, Repository } from 'typeorm';

import IChurchTokensRepository from '@modules/churchs/repositories/IChurchTokensRepository';

import ChurchToken from '../entities/ChurchToken';

class ChurchTokensRepository implements IChurchTokensRepository {
  private ormRepository: Repository<ChurchToken>;

  constructor() {
    this.ormRepository = getRepository(ChurchToken);
  }

  public async findByToken(token: string): Promise<ChurchToken | undefined> {
    const findedChurchToken = await this.ormRepository.findOne({
      where: { token },
    });

    return findedChurchToken;
  }

  public async findByChurch(church_id: string): Promise<ChurchToken[]> {
    const findedChurchTokens = await this.ormRepository.find({
      where: { church_id },
    });

    return findedChurchTokens;
  }

  public async generate(church_id: string): Promise<ChurchToken> {
    const churchToken = this.ormRepository.create({
      church_id,
    });

    await this.ormRepository.save(churchToken);

    return churchToken;
  }

  public async delete(token: ChurchToken): Promise<void> {
    await this.ormRepository.remove(token);
  }
}

export default ChurchTokensRepository;
