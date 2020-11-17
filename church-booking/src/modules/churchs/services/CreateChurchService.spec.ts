import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeChurchsRepository from '../repositories/fakes/FakeChurchsRepository';
import FakeChurchTokensRepository from '../repositories/fakes/FakeChurchTokensRepository';
import CreateChurchService from './CreateChurchService';

let fakeChurchsRepository: FakeChurchsRepository;
let fakeHashProvider: FakeHashProvider;
let createChurchService: CreateChurchService;
let fakeMailProvider: FakeMailProvider;
let fakeChurchTokensRepository: FakeChurchTokensRepository;

describe('CreateChurch', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeChurchTokensRepository = new FakeChurchTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    createChurchService = new CreateChurchService(
      fakeChurchsRepository,
      fakeHashProvider,
      fakeChurchTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to create a church', async () => {
    const church = await createChurchService.execute({
      id: 'igreja',
      email: 'igreja@example.com',
      name: 'Igreja',
      password: 'senha',
      color: '#fff',
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
      color: '#fff',
      url: 'igreja',
    });

    await expect(
      createChurchService.execute({
        id: 'igreja',
        email: 'igreja@example.com',
        name: 'Igreja',
        password: 'senha',
        color: '#fff',
        url: 'igreja',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a verify account token', async () => {
    const generateToken = jest.spyOn(fakeChurchTokensRepository, 'generate');

    const church = await createChurchService.execute({
      id: 'igreja',
      email: 'igreja@example.com',
      name: 'Igreja',
      password: 'senha',
      color: '#fff',
      url: 'igreja',
    });

    expect(generateToken).toHaveBeenCalledWith(church.id);
  });

  it('should be able to send verifation account email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await createChurchService.execute({
      id: 'igreja',
      email: 'igreja@example.com',
      name: 'Igreja',
      password: 'senha',
      color: '#fff',
      url: 'igreja',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
