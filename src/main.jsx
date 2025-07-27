import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </StrictMode>,
)