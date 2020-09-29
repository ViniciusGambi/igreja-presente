import FakeChurchsRepository from '@modules/churchs/repositories/fakes/FakeChurchsRepository';
import FakeReservesRepository from '@modules/reserves/repositories/fakes/FakeReservesRepository';
import AppError from '@shared/errors/AppError';
import FakeEventsRepository from '../repositories/fakes/FakeEventsRepository';
import ListEventsByChurchService from './ListEventsByChurchService';

let fakeEventsRepository: FakeEventsRepository;
let fakeChurchsRepository: FakeChurchsRepository;
let fakeReservesRepository: FakeReservesRepository;
let listEventsByChurch: ListEventsByChurchService;

describe('ListEventsByChurch', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeEventsRepository = new FakeEventsRepository();
    fakeReservesRepository = new FakeReservesRepository();
    listEventsByChurch = new ListEventsByChurchService(
      fakeEventsRepository,
      fakeChurchsRepository,
      fakeReservesRepository,
    );
  });

  it('should be able to list events by church', async () => {
    const church1 = await fakeChurchsRepository.create({
      id: 'church-name1',
      email: 'church1@example.com',
      name: 'Church1',
      password: 'password',
      url: 'church-name1',
    });

    const church2 = await fakeChurchsRepository.create({
      id: 'church-name2',
      email: 'church2@example.com',
      name: 'Church2',
      password: 'password',
      url: 'church-name2',
    });

    const event1 = await fakeEventsRepository.create({
      name: 'event-name-1',
      church_id: church1.id,
      date: new Date(),
      max_reservations: 50,
    });

    const event2 = await fakeEventsRepository.create({
      name: 'event-name-2',
      church_id: church2.id,
      date: new Date(),
      max_reservations: 50,
    });

    const events = await listEventsByChurch.execute(church2.id);

    expect(events[0].church_id).toBe(church2.id);
  });

  it('should not be able to get a event does not exists', async () => {
    await expect(
      listEventsByChurch.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
