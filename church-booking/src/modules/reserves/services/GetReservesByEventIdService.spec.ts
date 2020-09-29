import FakeChurchsRepository from '@modules/churchs/repositories/fakes/FakeChurchsRepository';
import FakeEventsRepository from '@modules/events/repositories/fakes/FakeEventsRepository';
import AppError from '@shared/errors/AppError';
import FakeReserveGroupsRepository from '../repositories/fakes/FakeReserveGroupsRepository';
import FakeReservesRepository from '../repositories/fakes/FakeReservesRepository';
import GetReservesByEventId from './GetReservesByEventIdService';

let getReservesByEventIdService: GetReservesByEventId;
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

    getReservesByEventIdService = new GetReservesByEventId(
      fakeReservesRepository,
    );
  });

  it('should be able to get a reserve by event id', async () => {
    const church = await fakeChurchsRepository.create({
      id: 'church-name',
      email: 'church@example.com',
      name: 'Church',
      password: 'password',
      url: 'church-name',
    });

    const event1 = await fakeEventsRepository.create({
      name: 'event-name-1',
      church_id: church.id,
      date: new Date(),
      max_reservations: 50,
    });

    const reserveGroup1 = await fakeReserveGroupsRepository.create({
      event_id: event1.id,
    });

    const reserve1 = await fakeReservesRepository.create({
      reserve_group: reserveGroup1,
      name: 'name1',
    });

    const reserve2 = await fakeReservesRepository.create({
      reserve_group: reserveGroup1,
      name: 'name2',
    });

    const event2 = await fakeEventsRepository.create({
      name: 'event-name-1',
      church_id: church.id,
      date: new Date(),
      max_reservations: 50,
    });

    const reserveGroup2 = await fakeReserveGroupsRepository.create({
      event_id: event2.id,
    });

    const reserve3 = await fakeReservesRepository.create({
      reserve_group: reserveGroup2,
      name: 'name3',
    });

    const reserve4 = await fakeReservesRepository.create({
      reserve_group: reserveGroup2,
      name: 'name4',
    });

    const response = await getReservesByEventIdService.execute(event2.id);
    expect(response).not.toContain(reserve1);
    expect(response).not.toContain(reserve2);
    expect(response).toContain(reserve3);
    expect(response).toContain(reserve4);
  });
});
