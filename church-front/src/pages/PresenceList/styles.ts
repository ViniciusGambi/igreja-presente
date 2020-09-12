import styled, { css } from 'styled-components';
import { mainColor } from '../../assets/colors';

interface ListItemProps {
  presence: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding: 0 5vw;
`;

export const ListItem = styled.div<ListItemProps>`
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-decoration: none;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  ${props =>
    props.presence &&
    css`
      text-decoration-line: line-through;
    `}
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
    margin: 16px 0 20px 0;
    width: 100%;
    border: 1px solid ${mainColor};
  }
`;
