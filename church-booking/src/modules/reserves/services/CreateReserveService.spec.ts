import FakeChurchsRepository from '@modules/churchs/repositories/fakes/FakeChurchsRepository';
import FakeEventsRepository from '@modules/events/repositories/fakes/FakeEventsRepository';
import AppError from '@shared/errors/AppError';
import FakeReserveGroupsRepository from '../repositories/fakes/FakeReserveGroupsRepository';
import FakeReservesRepository from '../repositories/fakes/FakeReservesRepository';
import CreateReserveService from './CreateReserveService';

let createReserveService: CreateReserveService;
let fakeReservesRepository: FakeReservesRepository;
let fakeReserveGroupsRepository: FakeReserveGroupsRepository;
let fakeEventsRepository: FakeEventsRepository;
let fakeChurchsRepository: FakeChurchsRepository;

describe('CreateReserveService', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeEventsRepository = new FakeEventsRepository();
    fakeReservesRepository = new FakeReservesRepository();
    fakeReserveGroupsRepository = new FakeReserveGroupsRepository();

    createReserveService = new CreateReserveService(
      fakeReservesRepository,
      fakeReserveGroupsRepository,
      fakeEventsRepository,
    );
  });

  it('should be able to create a reserve', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church-name',
      email: 'church@example.com',
      name: 'Church',
      password: 'password',
      url: 'church-name',
    });

    const event = await fakeEventsRepository.create({
      name: 'event_name',
      church_id: church.id,
      date: new Date(),
      max_reservations: 50,
    });

    const reserves = await createReserveService.execute({
      event_id: event.id,
      names: ['name1', 'name2'],
    });

    expect(reserves[0]).toHaveProperty('id');
    expect(reserves).toHaveLength(2);
  });

  it('should not be able to create a reserve with a event does not exists', async () => {
    await expect(
      createReserveService.execute({
        event_id: 'non-existing-id',
        names: ['name1', 'name2'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create more reserves than max_reservations', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church-name',
      email: 'church@example.com',
      name: 'Church',
      password: 'password',
      url: 'church-name',
    });

    const event = await fakeEventsRepository.create({
      name: 'event_name',
      church_id: church.id,
      date: new Date(),
      max_reservations: 5,
    });

    await createReserveService.execute({
      event_id: event.id,
      names: ['name1', 'name2', 'name3', 'name4', 'name5'],
    });

    await expect(
      createReserveService.execute({
        event_id: event.id,
        names: ['name6'],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
