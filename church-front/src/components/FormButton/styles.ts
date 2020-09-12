import styled from 'styled-components';
import { shade } from 'polished';
import { secondColor } from '../../assets/colors';

export const Container = styled.div`
  button {
    width: 100%;
    background: ${secondColor};
    border-radius: 10px;
    border: 0;
    padding: 8px;
    color: #fff;
    font-weight: 500;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.1, secondColor)};
    }
  }
`;
