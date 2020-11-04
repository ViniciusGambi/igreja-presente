import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeChurchsRepository from '../repositories/fakes/FakeChurchsRepository';
import FakeChurchTokensRepository from '../repositories/fakes/FakeChurchTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeChurchsRepository: FakeChurchsRepository;
let fakeChurchTokensRepository: FakeChurchTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeChurchTokensRepository = new FakeChurchTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeChurchsRepository,
      fakeChurchTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    const { token } = await fakeChurchTokensRepository.generate(church.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '1234567',
      token,
    });

    const updatedChurch = await fakeChurchsRepository.findById(church.id);

    expect(generateHash).toHaveBeenCalledWith('1234567');
    expect(updatedChurch?.password).toBe('1234567');
  });

  it('shoud not be able to reset password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to reset password with non-existing church', async () => {
    const { token } = await fakeChurchTokensRepository.generate(
      'non-existing-church',
    );

    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shoud not be able to reset password if passed more than 2 hours', async () => {
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
      resetPasswordService.execute({
        password: '123123',
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

    await resetPasswordService.execute({
      password: '1234567',
      token,
    });

    const afterToken = await fakeChurchTokensRepository.findByToken(token);

    expect(beforeToken).toBeDefined();
    expect(afterToken).toBeUndefined();
  });
});
