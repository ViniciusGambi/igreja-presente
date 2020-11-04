import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  FiLogIn,
  FiMail,
  FiLock,
  FiUser,
  FiHome,
  FiCloud,
} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content } from './styles';
import { useToast } from '../../hooks/toast';
import FormButton from '../../components/FormButton';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  id: string;
  url: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  const createChurch = async (data: SignUpFormData) => {
    const church = await api.post('/churchs', data);
    return church;
  };

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('O campo é obrigatório'),
          id: Yup.string().required('O campo é obrigatório'),
          url: Yup.string().required('O campo é obrigatório'),
          email: Yup.string().required('O campo é obrigatório'),
          password: Yup.string().required('O campo é obrigatório'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas devem coincidir',
          ),
        });

        await schema.validate(data, { abortEarly: false });
        await createChurch(data);
        history.push('/login');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          const errorDescription =
            err.response && err.response.data.message === 'Email already exists'
              ? 'Esse email já foi cadastrado.'
              : 'Não foi possível conectar com o servidor, tente mais tarde.';

          addToast({
            type: 'error',
            title: 'Não foi possível fazer o cadastro',
            description: errorDescription,
          });
        }
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Crie a sua conta</h1>

          <Input icon={FiHome} name="name" placeholder="Nome da Igreja" />

          <Input icon={FiUser} name="id" placeholder="Nome de usuário" />

          <Input icon={FiCloud} name="url" placeholder="URL da paróquia" />

          <Input icon={FiMail} name="email" placeholder="Email" />

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />

          <Input
            icon={FiLock}
            name="passwordConfirmation"
            type="password"
            placeholder="Password"
          />

          <FormButton type="submit">Cadastrar</FormButton>
        </Form>

        <Link to="/">
          <FiLogIn />
          Ir para o Login
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
