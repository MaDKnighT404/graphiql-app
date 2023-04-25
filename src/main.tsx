import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< a756ea4548ae18ea62584d335e08b9df263a9142
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { App } from './app/App';

import './shared/config/i18n/i18n';

import './app/styles/index.scss';
=======
import { App } from './components/app';
>>>>>>> feat: initial architecture

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< a756ea4548ae18ea62584d335e08b9df263a9142
      <ThemeProvider>
        <App />
      </ThemeProvider>
=======
      <App />
>>>>>>> feat: initial architecture
    </BrowserRouter>
  </React.StrictMode>
);
