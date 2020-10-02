import styled, { css } from 'styled-components';
import { mainColor } from '../../assets/colors';

interface InputProps {
  isFocused?: boolean;
}

export const Input = styled.input<InputProps>`
  padding: 4px 4px 4px 12px;
  border-radius: 4px;
  border: 1px solid #fff;
  width: 70%;
  font-size: 16px;

  ${props =>
    props.isFocused &&
    css`
      border-color: red;
      border-width: 1px;
    `}
`;

export const Container = styled.div`
  display: flex;
  min-width: 50vw;

  @media (max-width: 600px) {
    min-height: 70vh;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;

  > input {
    border: 2px solid ${mainColor};
    padding: 4px 4px 4px 12px;
    border-radius: 4px;
    margin-bottom: 10px;
    max-width: 100%;
    font-size: 16px;
  }

  h1 {
    color: #000;
  }

  h2 {
    font-size: 16px;
    margin-right: 8px;
  }

  hr {
    width: 80%;
    border: 1px solid ${mainColor};
    margin: 12px 0;
  }

  button {
    background: ${mainColor};
    border-radius: 10px;
    border: 0;
    color: #fff;
    padding: 8px;
  }

  > div:nth-child(4) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  > div:nth-child(6) {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: flex-end;
    flex-grow: 1;

    button {
      margin-right: 5vw;
    }

    margin-bottom: 20px;
  }
`;

export const ListLine = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0 32px 0;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;

    > div {
      margin-left: 2%;
    }
  }
`;
