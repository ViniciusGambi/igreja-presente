import ICreateChurchDTO from '../dtos/ICreateChurchDTO';
import Church from '../infra/typeorm/entities/Church';

export default interface IUsersRepository {
  findById(id: string): Promise<Church | undefined>;
  findByEmail(email: string): Promise<Church | undefined>;
  findByIdOrEmail(idOrEmail: string): Promise<Church | undefined>;
  create(church: ICreateChurchDTO): Promise<Church>;
  save(church: Church): Promise<Church>;
}
