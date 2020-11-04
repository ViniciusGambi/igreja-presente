import ChurchToken from '../infra/typeorm/entities/ChurchToken';

export default interface IChurchTokensRepository {
  generate(church_id: string): Promise<ChurchToken>;
  findByToken(token: string): Promise<ChurchToken | undefined>;
  findByChurch(church_id: string): Promise<ChurchToken[]>;
  delete(token: ChurchToken): Promise<void>;
}
