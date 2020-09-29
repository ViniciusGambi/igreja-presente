import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeChurchsRepository from '../repositories/fakes/FakeChurchsRepository';
import CreateChurchService from './CreateChurchService';

let fakeChurchsRepository: FakeChurchsRepository;
let fakeHashProvider: FakeHashProvider;
let createChurchService: CreateChurchService;

describe('CreateChurch', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeHashProvider = new FakeHashProvider();
    createChurchService = new CreateChurchService(
      fakeChurchsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a church', async () => {
    const church = await createChurchService.execute({
      id: 'igreja',
      email: 'igreja@example.com',
      name: 'Igreja',
      password: 'senha',
      url: 'igreja',
    });

    expect(church).toHaveProperty('id');
  });

  it('should not be able to create with existent email', async () => {
    await createChurchService.execute({
      id: 'igreja',
      email: 'igreja@example.com',
      name: 'Igreja',
      password: 'senha',
      url: 'igreja',
    });

    await expect(
      createChurchService.execute({
        id: 'igreja',
        email: 'igreja@example.com',
        name: 'Igreja',
        password: 'senha',
        url: 'igreja',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
