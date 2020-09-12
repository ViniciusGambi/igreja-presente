import React from 'react';
import { Container } from './styles';
import Button from '../Button';
import { getformatedDate } from '../../utils/dateUtils';

interface EventProps {
  id: string;
  name: string;
  date: string;
  event_reserves: number;
  max_reservations: number;
}

interface Card {
  event: EventProps;
  color?: string;
  onClick(): void;
}

const Card: React.FC<Card> = ({ event, color, onClick }) => {
  return (
    <Container color={color}>
      <div>
        <div>
          <div>{event.name}</div>
          <div className="detail">{getformatedDate(event.date)}</div>
        </div>

        <div>
          <div className="bold">
            {`${event.max_reservations - event.event_reserves} vagas`}
          </div>
          <div className="bold">disponíveis</div>
          <div className="detail">
            {`${event.event_reserves} de ${event.max_reservations} vagas ocupadas`}
          </div>
        </div>
        <Button onClick={onClick}>fazer reserva</Button>
      </div>
    </Container>
  );
};

export default Card;
