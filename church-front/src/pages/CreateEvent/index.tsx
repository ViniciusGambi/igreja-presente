import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../../components/FormButton';
import { Container, Content } from './styles';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

interface CreateEventFormData {
  name: string;
  max_reservations: number;
  date: Date;
  time: string;
}

interface EditEventFormData {
  id: string;
  name: string;
  max_reservations: number;
  date: Date;
}

const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>({} as FormHandles);
  const { addToast } = useToast();
  const { token } = useAuth();
  const history = useHistory();
  const { eventId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(!!eventId);

  useEffect(() => {
    if (eventId) {
      api
        .get(`events/${eventId}`)
        .then(response => {
          const event = response.data;
          const date = new Date(event.date);

          if (formRef !== null) {
            formRef.current.setFieldValue('name', event.name);
            formRef.current.setFieldValue(
              'max_reservations',
              event.max_reservations,
            );
            formRef.current.setFieldValue(
              'date',
              date.toISOString().split('T')[0],
            );
            formRef.current.setFieldValue(
              'time',
              date.toTimeString().split(' ')[0].substring(0, 5),
            );
          }
          setIsLoading(false);
        })
        .catch(err => console.log(err));
    }
  }, [eventId]);

  const createEvent = useCallback(
    async (data: Omit<CreateEventFormData, 'time'>) => {
      const event = await api.post('/events', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return event;
    },
    [token],
  );

  const editEvent = useCallback(
    async ({ id, name, max_reservations, date }: EditEventFormData) => {
      const event = await api.patch(
        `events/${id}`,
        { id, name, max_reservations, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return event;
    },
    [token],
  );

  const deleteEvent = useCallback(
    async (id: string) => {
      alert('Essa função ainda está sendo desenvolvida. Solicite ao administrador para a remoção.')
      /*const event = await api.delete(`events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return event;*/
    },
    [token],
  );

  const parseDatetime = (date: Date, time: string): Date => {
    const fullDate = new Date(`${date} ${time}`);
    return fullDate;
  };

  const handleSubmit = useCallback(
    async ({ name, max_reservations, date, time }: CreateEventFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Esse campo é obrigatório'),
          max_reservations: Yup.number()
            .typeError('Deve ser um número')
            .required('Esse campo é obrigatório'),
          date: Yup.date()
            .typeError('Deve ser uma data válida')
            .required('Esse campo é obrigatório'),
          time: Yup.string()
            .matches(
              /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
              'Deve ser uma hora válida no formato HH:MM',
            )
            .required('Esse campo é obrigatório'),
        });

        await schema.validate(
          { name, max_reservations, date, time },
          { abortEarly: false },
        );

        const fullDate = parseDatetime(date, time);

        if (!eventId) {
          await createEvent({
            name,
            max_reservations,
            date: fullDate,
          });
          addToast({
            type: 'success',
            title: 'Evento criado com sucesso.',
          });
        } else {
          await editEvent({
            id: eventId,
            name,
            max_reservations,
            date: fullDate,
          });
          addToast({
            type: 'success',
            title: 'Alteração feita com sucesso.',
          });
        }
        history.push('/admin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Falha na conexão com o servidor',
            description: 'Tente novamente mais tarde.',
          });
        }
      }
    },
    [addToast, history, createEvent, eventId, editEvent],
  );

  return (
    <>
      <Header />
      <Container isLoading={isLoading}>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Informações Básicas</h1>
            <h4>As informações principais do seu evento</h4>
            <Input name="name" placeholder="Nome do evento" />
            <Input
              name="max_reservations"
              placeholder="Quantidade de vagas diponíveis"
              type="number"
            />
            <h1>Data e hora</h1>
            <h4>Informe a data e a hora do seu evento</h4>
            <Input name="date" placeholder="Data" type="date" />
            <Input name="time" placeholder="Hora" type="time" />

            <div className={`buttonLine${eventId ? ' line-between' : ''}`}>
              {eventId && (
                <Button
                  type="button"
                  color="#555"
                  onClick={() => {
                    deleteEvent(eventId);
                  }}
                >
                  Deletar evento
                </Button>
              )}

              <Button type="submit">
                {eventId ? 'Salvar Evento' : 'Criar evento'}
              </Button>
            </div>
          </Form>
        </Content>
      </Container>
      {isLoading && <Loading />}
    </>
  );
};

export default CreateEvent;
