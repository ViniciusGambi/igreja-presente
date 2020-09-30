import styled from 'styled-components';
import { mainColor } from '../../assets/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh-50px);
  padding: 0 5vw 50px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 608px;

  h1 {
    margin-left: 32px;
    margin-top: 32px;
    font-size: 32px;
  }

  hr {
    margin: 16px 0 0px 0;
    width: 100%;
    border: 1px solid ${mainColor};
  }

  .buttonLine {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 20px 0;
  }

  .eventCard + .eventCard {
    margin-top: 16px;
  }

  .eventCard {
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 0 50px;
    background: #fff;
    box-shadow: 0 0 8px 8px rgba(150, 0, 0, 0.05);
    height: 80px;
    width: 100%;
    border-radius: 10px;
  }
`;
