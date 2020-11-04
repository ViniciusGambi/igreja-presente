import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeChurchsRepository from '../repositories/fakes/FakeChurchsRepository';
import FakeChurchTokensRepository from '../repositories/fakes/FakeChurchTokensRepository';
import VerifyChurchService from './VerifyChurchService';

let fakeChurchsRepository: FakeChurchsRepository;
let fakeChurchTokensRepository: FakeChurchTokensRepository;
let verifyChurchService: VerifyChurchService;
let fakeHashProvider: FakeHashProvider;

describe('VerifyChurch', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeChurchTokensRepository = new FakeChurchTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    verifyChurchService = new VerifyChurchService(
      fakeChurchsRepository,
      fakeChurchTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to verify account', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    expect(church.active).toBe(false);

    const { token } = await fakeChurchTokensRepository.generate(church.id);

    await verifyChurchService.execute({ token });

    const updatedChurch = await fakeChurchsRepository.findById(church.id);

    expect(updatedChurch?.active).toBe(true);
  });

  it('shoud not be able to verify account with non-existing token', async () => {
    await expect(
      verifyChurchService.execute({
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to verify account with non-existing church', async () => {
    const { token } = await fakeChurchTokensRepository.generate(
      'non-existing-church',
    );

    await expect(
      verifyChurchService.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to verify account if passed more than 2 hours', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    const { token } = await fakeChurchTokensRepository.generate(church.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      verifyChurchService.execute({
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud be able to delete token after used', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    const { token } = await fakeChurchTokensRepository.generate(church.id);

    const beforeToken = await fakeChurchTokensRepository.findByToken(token);

    await verifyChurchService.execute({
      token,
    });

    const afterToken = await fakeChurchTokensRepository.findByToken(token);

    expect(beforeToken).toBeDefined();
    expect(afterToken).toBeUndefined();
  });
});
