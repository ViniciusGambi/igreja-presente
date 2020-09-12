import styled, { css } from 'styled-components';
import { mainColor } from '../../assets/colors';

interface ContainerProps {
  color?: string;
}

export const Container = styled.header<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    padding: 15px 0;

    ${props =>
      css`
        color: ${props.color};
      `}
  }

  img {
    height: 7vh;
    margin: 1.5vh 0;
  }

  hr {
    width: 40%;
    border: 1px solid ${mainColor};

    ${props =>
      css`
        border-color: ${props.color};
      `}
  }
`;
