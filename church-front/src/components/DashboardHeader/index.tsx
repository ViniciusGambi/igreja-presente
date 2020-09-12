import React from 'react';
import { Container } from './styles';
import logo from '../../assets/logo.png';

interface HeaderProps {
  churchName: string;
  color: string;
}

const Header: React.FC<HeaderProps> = ({ churchName, color, ...rest }) => {
  return (
    <Container color={color}>
      {/* <img src={logo} alt="Sagrados" /> */}
      <h1>{churchName}</h1>
      <hr />
    </Container>
  );
};

export default Header;
