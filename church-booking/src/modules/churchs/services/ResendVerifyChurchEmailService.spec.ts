import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeChurchsRepository from '../repositories/fakes/FakeChurchsRepository';
import FakeChurchTokensRepository from '../repositories/fakes/FakeChurchTokensRepository';
import ResendVerifyChurchEmailService from './ResendVerifyChurchEmailService';

let fakeChurchsRepository: FakeChurchsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeChurchTokensRepository: FakeChurchTokensRepository;
let resendVerifyChurchEmail: ResendVerifyChurchEmailService;

describe('ResendVerifyChurchEmail', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeChurchTokensRepository = new FakeChurchTokensRepository();
    resendVerifyChurchEmail = new ResendVerifyChurchEmailService(
      fakeChurchsRepository,
      fakeChurchTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to resend account verification email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    await fakeChurchTokensRepository.generate(church.id);

    await resendVerifyChurchEmail.execute(church);

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to resend verification account email to a non-existing church account', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    await fakeChurchsRepository.delete(church);

    await fakeChurchTokensRepository.generate(church.id);

    await expect(
      resendVerifyChurchEmail.execute(church),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a verify account token if does not exists any token', async () => {
    const generate = jest.spyOn(fakeChurchTokensRepository, 'generate');

    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    await resendVerifyChurchEmail.execute(church);

    expect(generate).toHaveBeenCalled();
  });

  it('should be able to generate a verify account token if does exists only expired token', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    await fakeChurchTokensRepository.generate(church.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    const generate = jest.spyOn(fakeChurchTokensRepository, 'generate');

    await resendVerifyChurchEmail.execute(church);

    expect(generate).toHaveBeenCalled();
  });
});
