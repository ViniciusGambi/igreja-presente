import { getRepository, Repository } from 'typeorm';
import ICreateChurchDTO from '@modules/churchs/dtos/ICreateChurchDTO';
import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import Church from '../entities/Church';

class ChurchsRepository implements IChurchsRepository {
  private ormRepository: Repository<Church>;

  constructor() {
    this.ormRepository = getRepository(Church);
  }

  public async findById(id: string): Promise<Church | undefined> {
    const finded = await this.ormRepository.findOne({
      where: { id },
    });

    return finded;
  }

  public async findByEmail(email: string): Promise<Church | undefined> {
    const finded = await this.ormRepository.findOne({
      where: { email },
    });

    return finded;
  }

  public async findByIdOrEmail(idOrEmail: string): Promise<Church | undefined> {
    const finded = await this.ormRepository.findOne({
      where: [{ id: idOrEmail }, { email: idOrEmail }],
    });

    return finded;
  }

  public async create(church: ICreateChurchDTO): Promise<Church> {
    const created = await this.ormRepository.create(church);
    await this.ormRepository.save(created);
    return created;
  }

  public async save(church: Church): Promise<Church> {
    await this.ormRepository.save(church);
    return church;
  }

  public async delete(church: Church): Promise<void> {
    await this.ormRepository.remove(church);
  }
}

export default ChurchsRepository;
