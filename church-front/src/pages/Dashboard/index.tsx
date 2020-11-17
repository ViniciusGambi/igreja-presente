import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Header from '../../components/DashboardHeader';
import Card from '../../components/Card';
import { Container, Title } from './styles';
import Reserves from '../Reserves';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface EventProps {
  id: string;
  name: string;
  date: string;
  event_reserves: number;
  max_reservations: number;
}

interface ChurchProps {
  id: string;
  name: string;
  color: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    maxWidth: '90vw',
    minHeight: '50vh',
    maxHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)',
  },
};

Modal.setAppElement('#root');

const Dashboard: React.FC = () => {
  const { churchId } = useParams();

  const [modalIsOpen, setIsOpen] = useState(false);

  const [events, setEvents] = useState<EventProps[]>([]);
  const [church, setChurch] = useState<ChurchProps>({} as ChurchProps);
  const [reservingEvent, setReservingEvent] = useState<EventProps>(
    {} as EventProps,
  );

  const { addToast } = useToast();

  useEffect(() => {
    async function loadData(): Promise<void> {
      try {
        const [loadedEvents, loadedChurch] = await Promise.all([
          api.get(`events/churchs/${churchId}`),
          api.get(`churchs/${churchId}`),
        ]);
        setEvents(loadedEvents.data);
        setChurch(loadedChurch.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Aconteceu um erro',
          description: 'Tente novamente mais tarde',
        });
      }
    }
    loadData();
  }, [modalIsOpen, churchId, addToast]);

  function openModal(event: EventProps) {
    setReservingEvent(event);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return church.name ? (
    <Container>
      <Header churchName={church.name} color={`#${church.color}`} />
      <div>
        <Title color={`#${church.color}`}>
          <h1>Próximos Eventos</h1>

          <div />
        </Title>
        <div className="cards-container">
          {events.map((event: EventProps) => (
            <Card
              key={event.id}
              event={event}
              color={`#${church.color}`}
              onClick={() => {
                openModal(event);
              }}
            />
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {modalIsOpen && (
          <Reserves event={reservingEvent} closeModal={closeModal} />
        )}
      </Modal>
    </Container>
  ) : (
    <Loading />
  );
};

export default Dashboard;
