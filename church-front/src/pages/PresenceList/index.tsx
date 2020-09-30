import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';
import { Container, Content, ListItem } from './styles';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {
  getFormatedHour,
  getWeekDay,
  getformatedDate,
} from '../../utils/dateUtils';
import Button from '../../components/FormButton';

interface ReserveProps {
  id: string;
  name: string;
  presence: boolean;
}

interface EventProps {
  id: string;
  name: string;
  date: string;
}

const PresenceList: React.FC = () => {
  const { eventId } = useParams();
  const { token } = useAuth();
  const history = useHistory();

  const [reserves, setReserves] = useState<ReserveProps[]>([]);
  const [event, setEvent] = useState<EventProps>({} as EventProps);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData(): Promise<void> {
      try {
        const [loadedReserves, loadedEvent] = await Promise.all([
          api.get(`reserves/${eventId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          api.get(`events/${eventId}`),
        ]);
        setReserves(loadedReserves.data);
        setEvent(loadedEvent.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    loadData();
  }, [eventId, token]);

  const handlePresence = (reserveId: string, presence: boolean) => {
    api
      .patch(
        `reserves/${reserveId}`,
        { presence },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const updatedReserves = reserves.map(reserve =>
          reserve.id !== reserveId
            ? { ...reserve }
            : { ...reserve, presence: response.data.presence },
        );
        setReserves(updatedReserves);
        console.log(response.data.presence);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Header />
      <Container>
        {!isLoading && (
          <Content>
            <h1>Lista de presença</h1>

            <div className="row-div">
              <h4>
                {`${event.name} - ${getWeekDay(event.date)} ${getformatedDate(
                  event.date,
                )} às ${getFormatedHour(event.date)}`}
              </h4>
              <Button
                onClick={() => history.push(`/admin/events/${eventId}/edit`)}
              >
                Editar
              </Button>
            </div>

            <hr />
            {reserves.map(reserve => (
              <ListItem
                key={reserve.id}
                presence={reserve.presence}
                className="listItem"
              >
                <a
                  onClick={() => {
                    handlePresence(reserve.id, !reserve.presence);
                  }}
                >
                  {reserve.name}
                </a>
                <input
                  onChange={() => {
                    handlePresence(reserve.id, !reserve.presence);
                  }}
                  type="checkbox"
                  name=""
                  checked={reserve.presence}
                />
              </ListItem>
            ))}
          </Content>
        )}
        {isLoading && <Loading />}
      </Container>
    </>
  );
};

export default PresenceList;
