import { container } from 'tsyringe';

import '@modules/churchs/providers';
import './providers';

import IChurchsRepository from '@modules/churchs/repositories/IChurchsRepository';
import ChurchsRepository from '@modules/churchs/infra/typeorm/repositories/ChurchsRepository';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository';

import IReservesRepository from '@modules/reserves/repositories/IReservesRepository';
import ReservesRepository from '@modules/reserves/infra/typeorm/repositories/ReservesRepository';

import IReserveGroupsRepository from '@modules/reserves/repositories/IReserveGroupsRepository';
import ReserveGroupsRepository from '@modules/reserves/infra/typeorm/repositories/ReserveGroupsRepository';
import ChurchTokensRepository from '@modules/churchs/infra/typeorm/repositories/ChurchTokensRepository';
import IChurchTokensRepository from '@modules/churchs/repositories/IChurchTokensRepository';

container.registerSingleton<IChurchsRepository>(
  'ChurchsRepository',
  ChurchsRepository,
);

container.registerSingleton<IChurchTokensRepository>(
  'ChurchTokensRepository',
  ChurchTokensRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);

container.registerSingleton<IReservesRepository>(
  'ReservesRepository',
  ReservesRepository,
);

container.registerSingleton<IReserveGroupsRepository>(
  'ReserveGroupsRepository',
  ReserveGroupsRepository,
);
