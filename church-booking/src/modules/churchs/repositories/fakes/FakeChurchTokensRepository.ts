import { uuid } from 'uuidv4';
import ChurchToken from '../../infra/typeorm/entities/ChurchToken';
import IChurchsTokensRepository from '../IChurchTokensRepository';

class FakeChurchTokensRepository implements IChurchsTokensRepository {
  private churchTokens: ChurchToken[] = [];

  public async generate(church_id: string): Promise<ChurchToken> {
    const churchToken = new ChurchToken();

    Object.assign(churchToken, {
      id: uuid(),
      token: uuid(),
      church_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.churchTokens.push(churchToken);

    return churchToken;
  }

  public async findByToken(token: string): Promise<ChurchToken | undefined> {
    const churchToken = this.churchTokens.find(tkn => tkn.token === token);
    return churchToken;
  }

  public async findByChurch(church_id: string): Promise<ChurchToken[]> {
    const churchTokens = this.churchTokens.filter(
      tkn => tkn.church_id === church_id,
    );
    return churchTokens;
  }

  public async delete(token: ChurchToken): Promise<void> {
    const findedIndex = this.churchTokens.findIndex(tkn => tkn.id === token.id);
    this.churchTokens.splice(findedIndex, 1);
  }
}

export default FakeChurchTokensRepository;
