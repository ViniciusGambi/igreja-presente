import React from 'react';
import { Container } from './styles';
// import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      {/* <img src={logo} alt="Sagrados" /> */}
      <div>
        <h1>igreja presente</h1>
        <button type="button" onClick={signOut}>
          logout
        </button>
      </div>
    </Container>
  );
};

export default Header;
