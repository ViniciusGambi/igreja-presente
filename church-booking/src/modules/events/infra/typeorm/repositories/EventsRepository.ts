import { getRepository, Repository } from 'typeorm';
import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import Event from '../entities/Event';

class EventsRepository implements IEventsRepository {
  private ormRepository: Repository<Event>;

  constructor() {
    this.ormRepository = getRepository(Event);
  }

  public async findById(id: string): Promise<Event | undefined> {
    const finded = await this.ormRepository.findOne({
      where: { id },
    });

    return finded;
  }

  public async findByChurchId(church_id: string): Promise<Event[]> {
    const finded = await this.ormRepository.find({
      where: { church_id },
    });

    return finded;
  }

  public async create(event: ICreateEventDTO): Promise<Event> {
    const created = await this.ormRepository.create(event);
    await this.ormRepository.save(created);
    return created;
  }

  public async delete(event: Event): Promise<void> {
    await this.ormRepository.delete(event);
  }

  public async save(event: Event): Promise<Event> {
    await this.ormRepository.save(event);
    return event;
  }
}

export default EventsRepository;
