import FakeChurchsRepository from '@modules/churchs/repositories/fakes/FakeChurchsRepository';
import FakeEventsRepository from '@modules/events/repositories/fakes/FakeEventsRepository';
import AppError from '@shared/errors/AppError';
import FakeReserveGroupsRepository from '../repositories/fakes/FakeReserveGroupsRepository';
import FakeReservesRepository from '../repositories/fakes/FakeReservesRepository';
import UpdateReserveService from './UpdateReserveService';

let updateReserveService: UpdateReserveService;
let fakeReservesRepository: FakeReservesRepository;
let fakeReserveGroupsRepository: FakeReserveGroupsRepository;
let fakeEventsRepository: FakeEventsRepository;
let fakeChurchsRepository: FakeChurchsRepository;

describe('GetReserveByEventId', () => {
  beforeEach(() => {
    fakeChurchsRepository = new FakeChurchsRepository();
    fakeEventsRepository = new FakeEventsRepository();
    fakeReservesRepository = new FakeReservesRepository();
    fakeReserveGroupsRepository = new FakeReserveGroupsRepository();

    updateReserveService = new UpdateReserveService(fakeReservesRepository);
  });

  it('should be able to update a reserve', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church-name',
      email: 'church@example.com',
      name: 'Church',
      password: 'password',
      url: 'church-name',
    });

    const event = await fakeEventsRepository.create({
      name: 'event-name-1',
      church_id: church.id,
      date: new Date(),
      max_reservations: 50,
    });

    const reserveGroup = await fakeReserveGroupsRepository.create({
      event_id: event.id,
    });

    const reserve = await fakeReservesRepository.create({
      reserve_group: reserveGroup,
      name: 'name1',
    });

    const updatedReserve = await updateReserveService.execute({
      reserve_id: reserve.id,
      presence: true,
    });

    expect(reserve.presence).toBeFalsy();
    expect(updatedReserve.presence).toBeTruthy();
  });

  it('should not be able to update a reserve does not exists', async () => {
    await expect(
      updateReserveService.execute({
        reserve_id: 'non-existing-id',
        presence: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
