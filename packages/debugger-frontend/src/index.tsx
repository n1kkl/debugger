import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/app.scss';
import App from './App';
import { ToastContainer, toast } from 'react-toastify';
import {BrowserRouter} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        <ToastContainer />
    </React.StrictMode>
);
