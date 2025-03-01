import { Request, Response } from 'express';
import { container } from 'tsyringe';
import GetEventService from '@modules/events/services/GetEventService';
import ListEventsByChurchService from '@modules/events/services/ListEventsByChurchService';
import DeleteEventService from '@modules/events/services/DeleteEventService';
import CreateEventService from '@modules/events/services/CreateEventService';
import UpdateEventService from '@modules/events/services/UpdateEventService';

class EventsController {
  public async get(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getEventService = container.resolve(GetEventService);
    const event = await getEventService.execute(id);

    return response.json(event);
  }

  public async listByChurch(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { church_id } = request.params;

    const listEventsByChurchService = container.resolve(
      ListEventsByChurchService,
    );
    const events = await listEventsByChurchService.execute(church_id);

    const leanEvents = events.map(event => {
      delete event.church;
      return event;
    });

    return response.json(events);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, date, max_reservations } = request.body;
    const church_id = request.user.id;

    const createEventService = container.resolve(CreateEventService);
    const event = await createEventService.execute({
      name,
      date,
      logged_church_id: church_id,
      max_reservations,
    });

    delete event.church;
    return response.json(event);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, date, max_reservations } = request.body;
    const church_id = request.user.id;

    const updateEventService = container.resolve(UpdateEventService);
    const event = await updateEventService.execute({
      id,
      name,
      date,
      church_id,
      max_reservations,
    });

    delete event.church;

    return response.json(event);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteEventService = container.resolve(DeleteEventService);
    await deleteEventService.execute(id);

    return response.status(204).send();
  }
}

export default EventsController;
