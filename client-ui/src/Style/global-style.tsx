import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Roboto, "Helvetica Neue", sans-serif;
    user-select: none;
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
  
  h1.ant-typography {
    user-select: none;
  }

  h2.ant-typography {
    user-select: none;
  }

  h3.ant-typography {
    user-select: none;
  }

  h4.ant-typography {
    user-select: none;
  }

  h5.ant-typography {
    user-select: none;
  }


`;
