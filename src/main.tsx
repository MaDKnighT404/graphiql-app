import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { Provider } from 'react-redux';
import ErrorBoundary from 'app/providers/ErrorBoundary/ErrorBoundary';
import { App } from './components/App';
import store from './redux/store';
import './shared/config/i18n/i18n';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
