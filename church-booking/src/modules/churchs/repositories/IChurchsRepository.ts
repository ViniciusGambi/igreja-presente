import ICreateChurchDTO from '../dtos/ICreateChurchDTO';
import Church from '../infra/typeorm/entities/Church';

export default interface IChurchsRepository {
  findById(id: string): Promise<Church | undefined>;
  findByEmail(email: string): Promise<Church | undefined>;
  findByIdOrEmail(idOrEmail: string): Promise<Church | undefined>;
  create(church: ICreateChurchDTO): Promise<Church>;
  delete(church: Church): Promise<void>;
  save(church: Church): Promise<Church>;
}
