import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import Button from '../../../../components/FormButton';
import Input from '../../../../components/Input';
import api from '../../../../services/api';
import { Container } from './styles';
import { useToast } from '../../../../hooks/toast';

interface CreateReserveModal {
  closeModal(): void;
  eventId: string;
}

interface FormData {
  name: string;
}

const CreateReserveModal: React.FC<CreateReserveModal> = ({
  closeModal,
  eventId,
}) => {
  const formRef = useRef<FormHandles>({} as FormHandles);
  const { addToast } = useToast();

  const postReserve = useCallback(
    async (name: string) => {
      try {
        await api.post('/reserves', {
          event_id: eventId,
          names: [name],
        });
        closeModal();
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Aconteceu um erro',
          description: 'Tente novamente mais tarde',
        });
      }
    },
    [addToast, closeModal, eventId],
  );

  const handleSubmit = useCallback(
    async (data: FormData) => {
      postReserve(data.name);
    },
    [postReserve],
  );

  return (
    <>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h4>Insira o nome da pessoa</h4>
          <Input name="name" placeholder="Nome aqui" />
          <div className="row">
            <Button type="button" onClick={() => closeModal()} color="#555">
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default CreateReserveModal;
