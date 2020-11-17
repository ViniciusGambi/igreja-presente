import AppError from '@shared/errors/AppError';
import FakeChurchsRepository from '../repositories/fakes/FakeChurchsRepository';
import GetChurchService from './GetChurchService';

let fakeChurchsRepository: FakeChurchsRepository;
let getChurchService: GetChurchService;

describe('GetChurch', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    getChurchService = new GetChurchService(fakeChurchsRepository);
  });

  it('should be able to get a church', async () => {
    await fakeChurchsRepository.create({
      id: 'igreja',
      email: 'igreja@example.com',
      name: 'Igreja',
      password: 'senha',
      url: 'igreja',
      color: '#fff'
    });

    const church = await getChurchService.execute('igreja');

    expect(church.id).toBe('igreja');
  });

  it('should not be able to get a church that does not exists', async () => {
    await expect(getChurchService.execute('igreja')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
