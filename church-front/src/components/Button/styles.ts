import styled from 'styled-components';
import { mainColor } from '../../assets/colors';

export const Container = styled.header`
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 0;
    background-color: #eee;
    color: ${mainColor};
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    width: 150px;
    height: 50px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
      background: #fff;
    }
  }
`;
