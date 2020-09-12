import styled, { css } from 'styled-components';
import { mainColor } from '../../assets/colors';

interface TitleProps {
  color?: string;
}

export const Container = styled.div`
  font-size: 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
  height: 100%;

  max-height: 100vh;

  > div {
    padding: 0 40px;

    .cards-container {
      display: flex;
      flex-wrap: nowrap;
      overflow-x: auto;
      margin-top: 5vh;
      padding: 0px 0px 5vh 0px;
      -webkit-overflow-scrolling: touch;
    }
  }
`;

export const Title = styled.div<TitleProps>`
  margin-top: 15vh;
  font-weight: 400;

  h1 {
    ${props =>
      css`
        color: ${props.color};
      `}
  }

  div {
    background-color: ${mainColor};
    width: 80px;
    height: 8px;

    ${props =>
      css`
        background-color: ${props.color};
      `}
  }
`;
