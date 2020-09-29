import FakeChurchsRepository from '@modules/churchs/repositories/fakes/FakeChurchsRepository';
import AppError from '@shared/errors/AppError';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import CreateEventService from './CreateEventService';

let fakeEventsRepository: FakeEventsRepository;
let fakeChurchsRepository: FakeChurchsRepository;
let createEventService: CreateEventService;

describe('CreateEvent', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeEventsRepository = new FakeEventsRepository();
    createEventService = new CreateEventService(
      fakeChurchsRepository,
      fakeEventsRepository,
    );
  });

  it('should be able to create a event', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church-name',
      email: 'church@example.com',
      name: 'Church',
      password: 'password',
      url: 'church-name',
    });

    const event = await createEventService.execute({
      name: 'event_name',
      logged_church_id: church.id,
      date: new Date(),
      max_reservations: 50,
    });

    expect(event).toHaveProperty('id');
    expect(event.church_id).toBe(church.id);
  });

  it('should not be able to create a event with a non-existing church', async () => {
    await expect(
      createEventService.execute({
        name: 'UpdateEvent',
        logged_church_id: 'non-existing-church-id',
        date: new Date(),
        max_reservations: 50,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
