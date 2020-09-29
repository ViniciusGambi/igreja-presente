import FakeChurchsRepository from '@modules/churchs/repositories/fakes/FakeChurchsRepository';
import AppError from '@shared/errors/AppError';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import GetEventService from './GetEventService';

let fakeEventsRepository: FakeEventsRepository;
let fakeChurchsRepository: FakeChurchsRepository;
let getEventService: GetEventService;

describe('GetEvent', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeEventsRepository = new FakeEventsRepository();
    getEventService = new GetEventService(fakeEventsRepository);
  });

  it('should be able to get a event', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church-name',
      email: 'church@example.com',
      name: 'Church',
      password: 'password',
      url: 'church-name',
    });

    const createdEvent = await fakeEventsRepository.create({
      name: 'event-name',
      church_id: church.id,
      date: new Date(),
      max_reservations: 50,
    });

    const gettedEvent = await getEventService.execute(createdEvent.id);

    expect(createdEvent.id === gettedEvent.id);
    expect(gettedEvent.id).toBeDefined();
  });

  it('should not be able to get a event does not exists', async () => {
    await expect(
      getEventService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
