import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./Style/global-style";
import {appTheme} from "./Style/theme";
import AppView from "./UI/Main/app-view";


function App() {
    return (

        <ThemeProvider theme={appTheme}>
            <GlobalStyle/>
            <AppView></AppView>
        </ThemeProvider>

    );
}

export default App;

