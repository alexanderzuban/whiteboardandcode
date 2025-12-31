import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import appStore, {persistor} from "./Store/App.store";
import {setupFontAwesome} from "./Style/font-awesome-subset";
import {PersistGate} from "redux-persist/integration/react";


setupFontAwesome()


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(logger.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
