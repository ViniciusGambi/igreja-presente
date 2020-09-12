import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { Container, Content, ListItem } from './styles';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

interface ReserveProps {
  id: string;
  name: string;
  presence: boolean;
}

const PresenceList: React.FC = () => {
  const { church } = useAuth();
  const { eventId } = useParams();
  const { token } = useAuth();

  const [reserves, setReserves] = useState<ReserveProps[]>([]);

  useEffect(() => {
    api
      .get(`reserves/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setReserves(response.data);
      })
      .catch(err => console.log(err));
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
        <Content>
          <h1>Lista de presença</h1>
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
      </Container>
    </>
  );
};

export default PresenceList;
