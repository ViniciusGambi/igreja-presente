import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import Button from '../../components/FormButton';
import { Container, Content } from './styles';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

interface CreateEventFormData {
  name: string;
  max_reservations: number;
  date: Date;
  time: string;
}

const CreateEvent: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { token } = useAuth();
  const history = useHistory();

  const createEvent = async (data: Omit<CreateEventFormData, 'time'>) => {
    const event = await api.post('/events', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return event;
  };

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
        const event = await createEvent({
          name,
          max_reservations,
          date: fullDate,
        });
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
    [addToast, history],
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Informações Básicas</h1>
            <h4>O arroz com feijão para descrever o seu evento</h4>
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

            <div className="buttonLine">
              <Button type="submit">Criar evento</Button>
            </div>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default CreateEvent;
