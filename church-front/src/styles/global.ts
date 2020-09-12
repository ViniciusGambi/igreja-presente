import { createGlobalStyle } from 'styled-components';
import { titlesMainColor, textMainColor } from '../assets/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F0F0F5;
		-webkit-font-smoothing: antialiased;
    color: ${textMainColor}
  }

  a {
    text-decoration: none;
  }

	body, input, button {
		font: 16px;
    font-family: 'Poppins', sans-serif;
	}

  button {
    cursor: pointer;
  }

  h1 {
    font-size: 20px;
    color: ${titlesMainColor};
  }

  .bold {
    font-weight: 500;
  }
`;
