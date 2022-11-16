import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

import './public.js';

ReactDOM.createRoot(document.getElementById('mhicha') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
