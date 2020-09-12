import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../components/FormButton';
import api from '../../services/api';
import { Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

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

  useEffect(() => {
    api.get(`events/${church.id}`).then(response => {
      setEvents(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <h1>Eventos</h1>
          <hr />
          <div className="buttonLine">
            <Link to="admin/create/event">
              <Button>Criar evento</Button>
            </Link>
          </div>
          {events.map(event => (
            <div
              key={event.id}
              className="eventCard"
              onClick={() => history.push(`admin/events/${event.id}/list`)}
            >
              {event.name}
            </div>
          ))}
        </Content>
      </Container>
    </>
  );
};

export default SignIn;
