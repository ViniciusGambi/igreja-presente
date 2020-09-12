import styled, { css } from 'styled-components';
import { mainColor } from '../../assets/colors';

interface InputProps {
  isFocused?: boolean;
}

export const Input = styled.input<InputProps>`
  padding: 4px 4px 4px 12px;
  border-radius: 4px;
  border: 1px solid #fff;

  ${props =>
    props.isFocused &&
    css`
      border-color: red;
      border-width: 1px;
    `}
`;

export const Container = styled.div`
  min-width: 50vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  > input {
    border: 2px solid ${mainColor};
    padding: 4px 4px 4px 12px;
    border-radius: 4px;
    margin-bottom: 10px;
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
    justify-content: flex-end;

    button {
      margin-right: 5vw;
    }
  }

  table {
    margin: 8px auto 32px 16px;
    list-style: none;
  }

  td:first-child {
    padding: 0 25px;
  }

  td button:nth-child(2) {
    margin-left: 4px;
  }
`;
