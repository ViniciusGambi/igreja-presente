import styled, { css } from 'styled-components';
import { mainColor } from '../../assets/colors';

interface ContainerProps {
  color?: string;
}

export const Container = styled.div<ContainerProps>`
  flex: 0 0 auto;
  margin-right: 20px;
  height: 50vh;

  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 220px;
    height: 100%;
    border-radius: 10px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

    background: ${mainColor};
    color: #fff;

    ${props =>
      css`
        background: ${props.color};
      `}

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    div .detail {
      font-size: 12px;
    }
  }
`;
