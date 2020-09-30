import styled, { css } from 'styled-components';
import { shade } from 'polished';
import { secondColor } from '../../assets/colors';

interface ContainerProps {
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  button {
    width: 100%;
    background: ${secondColor};
    border-radius: 10px;
    border: 0;
    padding: 8px;
    color: #fff;
    font-weight: 500;
    transition: background-color 0.2s;

    ${props =>
      props.color &&
      css`
        background: ${props.color};
      `}

    &:hover {
      background: ${shade(0.1, secondColor)};

      ${props =>
        props.color &&
        css`
          background: ${shade(0.1, props.color)};
        `}
    }
  }
`;
