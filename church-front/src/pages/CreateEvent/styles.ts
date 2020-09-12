import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  padding: 0 5vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 608px;

  h1 {
    margin-top: 32px;
    font-size: 28px;
  }

  h4 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 16px;
  }

  form {
    width: 100%;
  }

  .buttonLine {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 20px 0;
  }
`;
