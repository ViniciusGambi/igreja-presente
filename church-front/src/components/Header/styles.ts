import styled from 'styled-components';
import { mainColor, headerText } from '../../assets/colors';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${mainColor};
  width: 100%;
  height: 50px;

  h1 {
    color: ${headerText};
  }

  button {
    color: ${headerText};
    background: transparent;
    border: 0;
    font-size: 16px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    max-width: 900px;
  }

  img {
    height: 7vh;
    margin: 1.5vh 0;
  }
`;
