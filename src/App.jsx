import React from 'react';
import { StateProvider } from './context/StateContext';
import { Todos } from './containers/Todos';

/**
 * Main App component.
 *
 * This component serves as the root of the application. It wraps the Todos component with the
 * StateProvider to provide access to the global state throughout the application.
 *
 * @returns {JSX.Element} The main application component.
 */
export const App = () => {
  return (
    // Wrap the Todos component with the StateProvider to make the context available.
    <StateProvider>
      <Todos />
    </StateProvider>
  );
};
