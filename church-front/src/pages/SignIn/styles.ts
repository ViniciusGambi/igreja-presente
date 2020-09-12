import styled from 'styled-components';
import { mainColor } from '../../assets/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 5vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 600px) {
    width: 350px;
  }

  form {
    margin: 10px 0;
    width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }
  }

  > a {
    margin-top: 16px;
    svg {
      margin-right: 4px;
    }
    display: flex;
    align-items: center;
    color: ${mainColor};
    text-decoration: none;
    transition: color 0.2s;
  }
`;
