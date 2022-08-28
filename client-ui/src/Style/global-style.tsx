import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, "Helvetica Neue", sans-serif;
  }


  #root {
    width: 100%;
    height: 100%;
  }

  div.ant-tooltip-inner {
    user-select: none;
  }

  div.ant-tabs {
    user-select: none;
  }

`;
