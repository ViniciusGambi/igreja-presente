import ICreateChurchDTO from '@modules/churchs/dtos/ICreateChurchDTO';
import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import Church from '@modules/churchs/infra/typeorm/entities/Church';

class FakeChurchsRepository implements IChurchsRepository {
  private churchs: Church[] = [];

  public async findById(id: string): Promise<Church | undefined> {
    const finded = this.churchs.find(church => church.id === id);
    return finded;
  }

  public async findByEmail(email: string): Promise<Church | undefined> {
    const finded = this.churchs.find(church => church.email === email);
    return finded;
  }

  public async findByIdOrEmail(idOrEmail: string): Promise<Church | undefined> {
    const finded = this.churchs.find(
      church => church.email === idOrEmail || church.id === idOrEmail,
    );
    return finded;
  }

  public async create(church: ICreateChurchDTO): Promise<Church> {
    const createdChurch = new Church();

    Object.assign(createdChurch, { active: false }, church);

    this.churchs.push(createdChurch);

    return createdChurch;
  }

  public async save(church: Church): Promise<Church> {
    const findedIndex = this.churchs.findIndex(chc => chc.id === church.id);
    this.churchs[findedIndex] = church;

    return church;
  }

  public async delete(church: Church): Promise<void> {
    const findedIndex = this.churchs.findIndex(chc => chc.id === church.id);
    this.churchs.splice(findedIndex, 1);
  }
}

export default FakeChurchsRepository;
