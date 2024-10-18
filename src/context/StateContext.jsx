import React, { useContext, useRef, useState } from 'react';

// Create a context for the global state.
const StateContext = React.createContext();

/**
 * Custom hook to access the StateContext.
 *
 * @returns {Object} The current context value, which includes the state and functions to modify it.
 */
export const useStateContext = () => {
    return useContext(StateContext);
};

/**
 * StateProvider Component
 *
 * This component provides global state management for the todo application,
 * allowing components to access and modify todos, filters, and the current
 * todo being edited. The state is persisted in localStorage.
 *
 * @param {Object} props - The props for the component.
 * @param {ReactNode} props.children - The child components to be rendered within the provider.
 *
 * @returns {JSX.Element} A React component that provides context to its children.
 */
export const StateProvider = ({ children }) => {
    const DBKey = 'todo_db'; // Key used for localStorage.

    // Default data structure for todos and configuration.
    const defaultData = {
        todos: [], // Array to hold todo items.
        config: {
            filter: 'all' // Default filter type.
        }
    };

    // Default structure for a single todo item.
    const defaultTodo = {
        id: '',
        title: '',
        done: false
    };

    // Available filters for viewing todos.
    const filters = [
        {
            type: 'all',
            title: 'All'
        },
        {
            type: 'done',
            title: 'Done'
        },
        {
            type: 'remaining',
            title: 'Remaining'
        }
    ];

    const defaultAlert = {
        show: false,
        message: '',
        autoHide: false,
        handler: null,
        handlerText: '',
        global: false,
        databaseLock: false,
        disableCancel: false
    };

    // State for storing todos, initialized from localStorage if available.
    const [alert, setAlert] = useState(defaultAlert);
    const [data, setData] = useState(() => {
        const savedData = localStorage.getItem(DBKey); // Retrieve saved data from localStorage.

        if (!savedData) {
            return defaultData;
        }

        try {
            return JSON.parse(savedData);
        } catch (err) {
            setAlert((prev) => ({
                ...prev,
                show: true,
                message: 'Your data is corrupted! Would you like to delete corrupted data?',
                autoHide: false,
                handler: () => {
                    localStorage.clear();
                    setAlert(defaultAlert);
                },
                handlerText: 'Delete',
                global: true,
                databaseLock: true,
                disableCancel: true
            }));
            return defaultData;
        }
    });

    const [filter, setFilter] = useState(data.config.filter); // State for the current filter.
    const [currentTodo, setCurrentTodo] = useState(defaultTodo); // State for the currently edited todo.
    const [currentTodos, setCurrentTodos] = useState([]); // State for the current list of todos.
    const inputRef = useRef(null); // Ref for the input field.

    // Value to be provided to the context consumers.
    const value = {
        DBKey,
        defaultData,
        filters,
        filter,
        setFilter,
        data,
        setData,
        defaultTodo,
        currentTodo,
        setCurrentTodo,
        currentTodos,
        setCurrentTodos,
        alert,
        setAlert,
        defaultAlert,
        inputRef
    };

    // Provide the context value to child components.
    return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};
