import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeChurchsRepository from '../repositories/fakes/FakeChurchsRepository';
import FakeChurchTokensRepository from '../repositories/fakes/FakeChurchTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeChurchsRepository: FakeChurchsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeChurchTokensRepository: FakeChurchTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeChurchTokensRepository = new FakeChurchTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeChurchsRepository,
      fakeChurchTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to recover the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'church@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing church password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'church@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeChurchTokensRepository, 'generate');

    const church = await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'church@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(church.id);
  });

  it('should be able to resend an existent token', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeChurchsRepository.create({
      id: 'church',
      name: 'church-name',
      email: 'church@example.com',
      url: 'church',
      password: '123456',
    });

    const token1 = await sendForgotPasswordEmailService.execute({
      email: 'church@example.com',
    });

    const token2 = await sendForgotPasswordEmailService.execute({
      email: 'church@example.com',
    });

    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(token1).toEqual(token2);
  });
});
