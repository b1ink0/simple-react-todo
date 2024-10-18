import React, { Fragment } from 'react';
import { useStateContext } from '../context/StateContext';
import { Todo } from '../components/Todo';
import { Input } from '../components/Input';
import { Filters } from '../components/Filters';
import '../assets/css/todos.css';
import { Alert } from '../components/Alert';

/**
 * Todos Component
 *
 * This component renders the main layout for managing todos, including
 * displaying the list of current todos, input for new todos, and filters
 * for viewing specific todos.
 *
 * @returns {JSX.Element} A React component that displays todos with input and filter options.
 */
export const Todos = () => {
    // Destructure currentTodos from the global state.
    const { currentTodos, alert } = useStateContext();

    return (
        <Fragment>
            <div className="todos">
                <h1 className="todos-heading" aria-label="Todo list heading">
                    TODO
                </h1>
                <ul className="todos-wrap">
                    {0 < currentTodos.length ? (
                        // Map through the currentTodos and render a Todo component for each
                        currentTodos.map((todo) => {
                            // Ensure that the todo has a valid ID before rendering.
                            if (!todo?.id || !todo) {
                                return null;
                            }

                            // Render the Todo component.
                            return <Todo key={todo.id} todo={todo} />;
                        })
                    ) : (
                        // Display a message when there are no todos in the current filter
                        <li className="no-todos-message" aria-live="polite">
                            No todos found!
                        </li>
                    )}
                </ul>
                <div className="todos-float" role="group" aria-label="Todo input and filters">
                    <Filters />
                    <Input />
                    {!alert.global && <Alert />}
                </div>
            </div>
            {alert.global && (
                <div className="alert-global">
                    <Alert />
                </div>
            )}
        </Fragment>
    );
};
