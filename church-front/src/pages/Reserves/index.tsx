import React, { useState } from 'react';
import { FiTrash, FiEdit, FiPlus } from 'react-icons/fi';
import { Container, Content, Input, ListLine } from './styles';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import api from '../../services/api';


import {
  getformatedDate,
  getFormatedHour,
  getWeekDay,
} from '../../utils/dateUtils';

interface Reserve {
  name: string;
  isFocused: boolean;
}

interface EventProps {
  id: string;
  name: string;
  date: string;
  event_reserves: number;
  max_reservations: number;
}

interface ReservesProps {
  event: EventProps;
  closeModal(): void;
}

const Reserves: React.FC<ReservesProps> = ({ event, closeModal }) => {
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [reserves, setReserves] = useState<Reserve[]>([]);

  const postReserve = async () => {
    const reservesNames = reserves.map(reserve => reserve.name);

    try {
      if (reserves.length <= 0) {
        alert('Insira uma reserva clicando no + .');
        return;
      }

      const notFilleds = reserves.filter(rsv => rsv.name === '');

      if (notFilleds.length > 0) {
        alert('É necessário colocar nome em todas as reservas.');
        return;
      }

      if (whatsapp.length !== 13) {
        alert('Insira um whatsapp válido.');
        return;
      }

      const reserve = await api.post('/reserves', {
        event_id: event.id,
        names: reservesNames,
        whatsapp,
      });

      if (reserve.status === 200) {
        //alert(`Reserva feita com ID: ${reserve.data[0].reserve_group_id}`);
        alert('Sua reserva foi feita! Você receberá um comprovante por whatsapp em alguns minutos.')
        closeModal();
      }
    } catch (err) {
      if (
        err.response.data.message ===
        'You are trying to create more reserves than has available.'
      ) {
        alert(
          'Você está tentando criar mais reservas do que o número de reservas disponíveis. Atualize a página e tente novamente.',
        );
      } else {
        alert(err.response.data.message);
      }
    }
  };

  const handleNewReserve = () => {
    setReserves(oldReserves => [...oldReserves, { name: '', isFocused: true }]);
  };

  const handleChangeInput = (
    position: number,
    ev: React.FormEvent<HTMLInputElement>,
  ) => {
    const changedReserves = reserves.map((reserve, index) =>
      index === position
        ? { ...reserve, name: ev.currentTarget.value }
        : reserve,
    );
    setReserves(changedReserves);
  };

  const handleEditReserve = (position: number) => {
    const editedReserves = reserves.map((reserve, index) =>
      index === position ? { ...reserve, isFocused: true } : reserve,
    );
    setReserves(editedReserves);
  };

  const handleRemoveReserve = (position: number) => {
    const filteredReserves = reserves.filter((_, index) => index !== position);
    setReserves(filteredReserves);
  };

  const handleBlur = (position: number) => {
    const editedReserves = reserves.map((reserve, index) =>
      index === position && reserves[position].name
        ? { ...reserve, isFocused: false }
        : reserve,
    );
    setReserves(editedReserves);
  };

  return (
    <Container>
      <Content>
        <h1>
          {`Criar reserva - ${getWeekDay(event.date)} ${getformatedDate(
            event.date,
          )} às ${getFormatedHour(event.date)}`}
        </h1>
        <hr />
        {/*<input
          type="text"
          placeholder="Insira aqui o seu Whatsapp"
          value={whatsapp}
          onChange={ev => {
            setWhatsapp(ev.currentTarget.value);
          }}
        />*/}

        <h2>Insira abaixo o seu whatsapp abaixo</h2>
        <PhoneInput
          country={'br'}
          value={whatsapp}
          onChange={(ev: string) => {
            setWhatsapp(ev);
          }
        }
        />

        <div>
          <h2>Para quem você fará a reserva?</h2>
          <button type="button" onClick={handleNewReserve}>
            <FiPlus />
          </button>
        </div>

        <ListLine>
          {reserves.length > 0 ? (
            reserves.map((reserve, index) => {
              return (
                <div key={`name+${index}`}>
                  <Input
                    type="text"
                    placeholder="Insira aqui o nome"
                    value={reserve.name}
                    onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                      handleChangeInput(index, ev);
                    }}
                    onBlur={() => {
                      handleBlur(index);
                    }}
                    isFocused={reserve.isFocused}
                    readOnly={!reserve.isFocused}
                  />

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveReserve(index);
                      }}
                    >
                      <FiTrash />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleEditReserve(index);
                      }}
                    >
                      <FiEdit />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <div>Clique no botão de + acima para adicionar as reservas</div>
            </div>
          )}
        </ListLine>
        <div className="button-box">
          <button type="button" onClick={postReserve}>
            Fazer reserva!
          </button>
        </div>
      </Content>
    </Container>
  );
};

export default Reserves;
