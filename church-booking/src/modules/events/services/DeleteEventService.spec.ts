import FakeChurchsRepository from '@modules/churchs/repositories/fakes/FakeChurchsRepository';
import AppError from '@shared/errors/AppError';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import DeleteEventService from './DeleteEventService';

let fakeEventsRepository: FakeEventsRepository;
let fakeChurchsRepository: FakeChurchsRepository;
let deleteEventService: DeleteEventService;

describe('DeleteEvent', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeEventsRepository = new FakeEventsRepository();
    deleteEventService = new DeleteEventService(fakeEventsRepository);
  });

  it('should be able to create a event', async () => {
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

    expect(createdEvent).toBeDefined();

    await deleteEventService.execute(createdEvent.id);

    const deletedEvent = await fakeEventsRepository.findById(createdEvent.id);

    expect(deletedEvent).toBeUndefined();
  });

  it('should not be able to delete a event does not exists', async () => {
    await expect(
      deleteEventService.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
