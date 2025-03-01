import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    visibility: hidden;
    opacity: 0;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.4s;
    width: max-content;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: #321e38;

    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  svg:hover ~ span {
    visibility: visible;
    opacity: 1;
  }
`;
