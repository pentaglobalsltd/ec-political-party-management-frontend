import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AppRouter } from './router';

import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';
import './translations/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const base = (
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);

const renderWithOutKeycloak = () => root.render(base);

renderWithOutKeycloak();
