import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Container, Content } from './styles';
import { useToast } from '../../hooks/toast';
import FormButton from '../../components/FormButton';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ResetFormData {
  password: string;
  passwordConfirmation: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const tkn = useQuery().get('token') || '';

  const { addToast } = useToast();

  const resetPassword = useCallback(
    async (password: string, token: string) => {
      console.log(password, tkn);
      await api.post('/password/reset', { password, token: tkn });
    },
    [tkn],
  );

  const handleSubmit = useCallback(
    async (data: ResetFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('O campo é obrigatório'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas devem coincidir',
          ),
        });

        await schema.validate(data, { abortEarly: false });

        await resetPassword(data.password, tkn);
        history.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          console.log(err);
          addToast({
            type: 'error',
            title: 'Erro na conexão',
          });
        }
      }
    },
    [addToast, history, resetPassword, tkn],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar sua senha</h1>

          <Input icon={FiMail} name="user" placeholder="Senha" />

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Confirmação da senha"
          />

          <FormButton type="submit">Resetar</FormButton>
        </Form>

        <Link to="/cadastro">
          <FiLogIn />
          Ir para o Login
        </Link>
      </Content>
    </Container>
  );
};

export default ResetPassword;
