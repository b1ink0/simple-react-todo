import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './assets/css/index.css';

/**
 * Main entry point for the React application.
 *
 * This file initializes the application by rendering the App component into the root element
 * of the HTML document. It uses React.StrictMode to highlight potential problems in the application.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
