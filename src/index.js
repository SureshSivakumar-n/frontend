import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Updated syntax
root.render(
  <App />  // No need to wrap App with BrowserRouter here
);
