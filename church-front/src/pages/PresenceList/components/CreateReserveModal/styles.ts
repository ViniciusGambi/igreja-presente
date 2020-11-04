import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 5vw;

  @media (max-width: 600px) {
    width: 80vw;
  }

  .row {
    display: flex;

    div {
      flex: 1;
    }

    div:first-child {
      margin-right: 4px;
    }
  }
`;
