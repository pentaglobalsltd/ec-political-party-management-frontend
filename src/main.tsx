import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import ReactDOM from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

import { setStorage } from '@utils/local-store';
import { LS_KEYS } from '@constants/local-store';
import Loader from '@components/Loader';
import keycloak from './helpers/keycloak';
import { store } from './redux/store/store';
import { AppRouter } from './router';

import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';
import './translations/i18n';
import Error from '@containers/no-match/Error';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const eventLogger = (event: any, error: any) => {
  if (error) {
    console.log('============');
    console.log('key-cloak eventLogger');
    console.log('error:', error);
    console.log('event:', event);
    console.log('============');
  }
};

const tokenLogger = (tokens: any) => {
  // console.log('tokens.token:', tokens.token);

  // api.defaults.headers.Authorization = `Bearer ${tokens.token}`;
  // coreServiceApi.defaults.headers.Authorization = `Bearer ${tokens.token}`;
  // masterApi.defaults.headers.Authorization = `Bearer ${tokens.token}`;
  // candidateManagementServiceApi.defaults.headers.Authorization = `Bearer ${tokens.token}`;
  // ecUserManagementApi.defaults.headers.Authorization = `Bearer ${tokens.token}`;

  // console.log('==== tokenLogger');
  // console.log('tokens.token:', tokens.token);

  setStorage(LS_KEYS.AUTH_TOKEN, tokens.token);
};

const logError = (error: Error, info: { componentStack: string }) => {
  // Do something with the error, e.g. log to an external API
  console.log({ error, info });
};

const base = (
  <ReduxProvider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ToastContainer />
        <AppRouter />
      </BrowserRouter>
    </React.StrictMode>
  </ReduxProvider>
);

const renderWithKeycloak = () =>
  root.render(
    <ErrorBoundary fallback={<Error />} onError={logError as any}>
      <ReactKeycloakProvider
        // initOptions={{ onLoad: 'check-sso' }} // don't remove this
        initOptions={{ onLoad: 'login-required' }}
        authClient={keycloak}
        onEvent={eventLogger}
        onTokens={tokenLogger}
        LoadingComponent={<Loader />}
      >
        {base}
      </ReactKeycloakProvider>
    </ErrorBoundary>,
  );

const renderWithOutKeycloak = () => root.render(base);

if (import.meta.env.VITE_AUTH_GRANT_FLOW === 'true') renderWithKeycloak();
else renderWithOutKeycloak();
