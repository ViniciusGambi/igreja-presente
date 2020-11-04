import React, { useEffect, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { Container, Content } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import Loading from '../../components/Loading';

interface ResetFormData {
  password: string;
  passwordConfirmation: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const AccountVerification: React.FC = () => {
  const tkn = useQuery().get('token') || '';
  const [verificationStatus, setVerificationStatus] = useState<
    'success' | 'expired' | 'network error'
  >();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { addToast } = useToast();

  useEffect(() => {
    api
      .post(
        '/churchs/verificate',
        { token: tkn },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      .then(() => {
        setVerificationStatus('success');
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        if (err.message === 'Network Error') {
          addToast({
            title: 'Falha na comunicação com o servidor',
            description: 'Tente novamente mais tarde.',
            type: 'error',
          });
          setVerificationStatus('network error');
          return;
        }
        if (err.response.data.message === 'Church token does not exists') {
          setVerificationStatus('expired');
        }
      });
  }, [tkn, addToast]);

  return (
    <>
      <Container>
        {!isLoading && (
          <Content>
            {verificationStatus === 'success' && (
              <>
                <span>A conta foi ativada.</span>
                <Link to="/cadastro">
                  <FiLogIn />
                  Ir para o Login
                </Link>
              </>
            )}

            {verificationStatus === 'network error' && (
              <>
                <span>
                  Houve uma falha na conexão com o servidor. Tente novamente
                  mais tarde.
                </span>
              </>
            )}

            {verificationStatus === 'expired' && (
              <>
                <span>
                  Link inválido ou expirado. Caso sua conta ainda não esteja
                  ativa, reenvie o link no painel de administração após fazer
                  login.
                </span>
              </>
            )}
          </Content>
        )}
      </Container>
      {isLoading && <Loading />}
    </>
  );
};

export default AccountVerification;
