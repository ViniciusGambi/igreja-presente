import Event from '../infra/typeorm/entities/Event';
import CreateEventDTO from '../dtos/ICreateEventDTO';

export default interface IEventsRepository {
  findById(id: string): Promise<Event | undefined>;
  findByChurchId(church_id: string): Promise<Event[]>;
  create(event: CreateEventDTO): Promise<Event>;
  delete(event: Event): Promise<void>;
  save(event: Event): Promise<Event>;
}
