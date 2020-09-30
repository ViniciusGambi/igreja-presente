import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const FormButton: React.FC<ButtonProps> = ({ children, color, ...rest }) => (
  <Container color={color}>
    <button type="button" {...rest}>
      {children}
    </button>
  </Container>
);

export default FormButton;
