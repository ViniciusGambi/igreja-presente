import FakeChurchsRepository from '@modules/churchs/repositories/fakes/FakeChurchsRepository';
import AppError from '@shared/errors/AppError';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import UpdateEventService from './UpdateEventService';

let fakeEventsRepository: FakeEventsRepository;
let fakeChurchsRepository: FakeChurchsRepository;
let updateEventService: UpdateEventService;

describe('UpdateEvent', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeEventsRepository = new FakeEventsRepository();
    updateEventService = new UpdateEventService(
      fakeChurchsRepository,
      fakeEventsRepository,
    );
  });

  it('should be able to update a event', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church-name',
      email: 'church@example.com',
      name: 'Church',
      password: 'password',
      url: 'church-name',
    });

    const event = await fakeEventsRepository.create({
      name: 'event-name',
      church_id: church.id,
      date: new Date(),
      max_reservations: 50,
    });

    const updatedEvent = await updateEventService.execute({
      ...event,
      name: 'updated-event-name',
    });

    expect(event.name).toBe('event-name');
    expect(updatedEvent.name).toBe('updated-event-name');
  });

  it('should not be able to update a event does not exists', async () => {
    expect(
      updateEventService.execute({
        id: 'non-existing-id',
        name: 'event-name',
        church_id: 'church-id',
        date: new Date(),
        max_reservations: 50,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a event with a church does not exists', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church-name',
      email: 'church@example.com',
      name: 'Church',
      password: 'password',
      url: 'church-name',
    });

    const event = await fakeEventsRepository.create({
      name: 'event-name',
      church_id: church.id,
      date: new Date(),
      max_reservations: 50,
    });

    await expect(
      updateEventService.execute({
        ...event,
        church_id: 'non-existing-church_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
