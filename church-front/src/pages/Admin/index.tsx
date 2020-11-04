import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/FormButton';
import api from '../../services/api';
import { Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { alphabeticSort } from '../../utils/jsonSort';
import { useToast } from '../../hooks/toast';

import {
  getformatedDate,
  getFormatedHour,
  getWeekDay,
} from '../../utils/dateUtils';

interface LoginFormData {
  email: string;
  password: string;
}

interface EventProps {
  id: string;
  name: string;
  date: string;
  event_reserves: number;
  max_reservations: number;
}

const SignIn: React.FC = () => {
  const { church } = useAuth();
  const history = useHistory();

  const [events, setEvents] = useState<EventProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadData(): Promise<void> {
      try {
        const response = await api.get(`events/churchs/${church.id}`);
        const sortedEvents = alphabeticSort(response.data, 'date');
        setEvents(sortedEvents);
        setIsLoading(false);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Aconteceu um erro',
          description: 'Tente novamente mais tarde',
        });
      }
    }
    loadData();
  }, [church.id, addToast]);

  return (
    <>
      <Header />
      <Container>
        {!isLoading && (
          <Content>
            <h1>Eventos</h1>
            <hr />
            <div className="buttonLine">
              <Link to="/admin/events/create">
                <Button>Criar evento</Button>
              </Link>
            </div>
            {events.map(event => (
              <div
                key={event.id}
                className="eventCard"
                onClick={() => history.push(`/admin/events/${event.id}/list`)}
              >
                {`${getWeekDay(event.date)}, ${getformatedDate(
                  event.date,
                )} às ${getFormatedHour(event.date)}`}
              </div>
            ))}
          </Content>
        )}
      </Container>
      {isLoading && <Loading />}
    </>
  );
};

export default SignIn;
