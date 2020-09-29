import ICreateEventDTO from '@modules/events/dtos/ICreateEventDTO';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import Event from '@modules/events/infra/typeorm/entities/Event';
import { uuid } from 'uuidv4';

class FakeEventsRepository implements IEventsRepository {
  private events: Event[] = [];

  public async findById(id: string): Promise<Event | undefined> {
    const finded = this.events.find(event => event.id === id);

    return finded;
  }

  public async findByChurchId(church_id: string): Promise<Event[]> {
    const finded = this.events.filter(event => event.church_id === church_id);

    return finded;
  }

  public async create(event: ICreateEventDTO): Promise<Event> {
    const created = new Event();

    Object.assign(created, { id: uuid() }, event);

    this.events.push(created);

    return created;
  }

  public async delete(event: Event): Promise<void> {
    const findedIndex = this.events.findIndex(ev => ev.id === event.id);
    this.events.splice(findedIndex, 1);
  }

  public async save(event: Event): Promise<Event> {
    const findedIndex = this.events.findIndex(ev => ev.id === event.id);
    this.events[findedIndex] = event;

    return event;
  }
}

export default FakeEventsRepository;
