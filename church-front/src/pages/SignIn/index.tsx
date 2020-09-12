import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { Container, Content } from './styles';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import FormButton from '../../components/FormButton';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

interface LoginFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { church: user, signIn, signOut } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          user: Yup.string().required('Esse campo obrigatório'),
          password: Yup.string().required('Esse campo obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });
        await signIn(data);
        history.push('/admin');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: 'Cheque suas credenciais.',
          });
        }
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Entrar no Sistema</h1>

          <Input icon={FiMail} name="user" placeholder="Usuário ou Email" />

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Password"
          />

          <FormButton type="submit">Login</FormButton>
        </Form>

        <Link to="/cadastro">
          <FiLogIn />
          Criar cadastro
        </Link>
      </Content>
    </Container>
  );
};

export default SignIn;
