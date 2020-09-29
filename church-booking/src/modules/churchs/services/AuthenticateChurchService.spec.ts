import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeChurchsRepository from '../repositories/fakes/FakeChurchsRepository';
import AuthenticateChurchService from './AuthenticateChurchService';
import CreateChurchService from './CreateChurchService';

let fakeChurchsRepository: FakeChurchsRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateChurchService: AuthenticateChurchService;
let createChurchService: CreateChurchService;

describe('AuthenticateChurchService', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateChurchService = new AuthenticateChurchService(
      fakeChurchsRepository,
      fakeHashProvider,
    );
    createChurchService = new CreateChurchService(
      fakeChurchsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate church with id or email', async () => {
    await createChurchService.execute({
      id: 'igreja',
      email: 'igreja@example.com',
      name: 'Igreja',
      password: 'hard-password',
      url: 'igreja',
    });

    const responseSendingEmail = await authenticateChurchService.execute({
      idOrEmail: 'igreja@example.com',
      password: 'hard-password',
    });

    const responseSendingId = await authenticateChurchService.execute({
      idOrEmail: 'igreja',
      password: 'hard-password',
    });

    expect(responseSendingEmail).toHaveProperty('token');
    expect(responseSendingId).toHaveProperty('token');
  });

  it('should be able to authenticate with church does not exists', async () => {
    expect(
      authenticateChurchService.execute({
        idOrEmail: 'igreja@example.com',
        password: 'hard-password',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateChurchService.execute({
        idOrEmail: 'igreja',
        password: 'hard-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with a invalid password', async () => {
    await createChurchService.execute({
      id: 'igreja',
      email: 'igreja@example.com',
      name: 'Igreja',
      password: 'hard-password',
      url: 'igreja',
    });

    await expect(
      authenticateChurchService.execute({
        idOrEmail: 'igreja@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
