import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';
import {
  mainBorderColor,
  hoverBorderColor,
  errorBorderColor,
  tooltipTextColor,
} from '../../assets/colors';

interface InputProps {
  isErrored: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<InputProps>`
  background: transparent;
  border-radius: 10px;
  border: 2px solid ${mainBorderColor};
  padding: 8px;
  display: flex;
  align-items: center;
  transition: 0.2s;

  svg {
    margin-right: 16px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${errorBorderColor};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${hoverBorderColor};
    `}

  ${props =>
    (props.isFilled || props.isFocused) &&
    css`
      color: ${hoverBorderColor};
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;
    font-size: 16px;
    display:block;
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    min-height: 1.2em;
    &::placeholder {
      color: ${mainBorderColor};
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background-color: ${errorBorderColor};
    color: ${tooltipTextColor};

    &::before {
      border-color: ${errorBorderColor} transparent;
    }
  }
`;
