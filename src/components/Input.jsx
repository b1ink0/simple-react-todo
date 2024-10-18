import React from 'react';
import { useTodos } from '../hooks/useTodo';
import { useStateContext } from '../context/StateContext';
import '../assets/css/input.css';
import { AddIcon } from '../assets/icons/AddIcon';
import { UpdateIcon } from '../assets/icons/UpdateIcon';

/**
 * Input Component
 *
 * This component renders a form for adding or updating a todo item. The form consists of
 * a text input for the todo title and a submit button. If the current todo has an ID, it
 * will trigger the `updateTodo` function on submission otherwise, it will call `addTodo`.
 *
 * @returns {JSX.Element} A React component that allows users to input or edit a todo item.
 */
export const Input = () => {
    const { currentTodo, inputRef } = useStateContext(); // Get the current todo object from the state context.
    const { handleTitleChange, addTodo, updateTodo, cancelEditTodo } = useTodos(); // Functions for adding/updating todos and handling input changes.

    return (
        // Form for adding/updating a todo item.
        <form
            className="form"
            onSubmit={'' === currentTodo.id ? addTodo : updateTodo}
            aria-label={currentTodo.id ? 'Edit todo item' : 'Add new todo item'}>
            {/* Label for title input only for accessibility hidden in UI. */}
            <label htmlFor="todo-input" className="hidden">
                {currentTodo.id ? 'Edit the todo title' : 'Enter a new todo title'}
            </label>

            {/* Text input for entering the todo title. */}
            <div className="input-wrap">
                <input
                    id="todo-input"
                    className="text-input"
                    type="text"
                    value={currentTodo.title}
                    onChange={handleTitleChange}
                    required
                    placeholder={currentTodo.id ? 'Edit todo title...' : 'Enter new todo title...'}
                    aria-required="true"
                    aria-label="Todo title input"
                    ref={inputRef}
                />

                <button
                    className="submit-btn spin"
                    type="submit"
                    title={currentTodo.id ? 'Update todo' : 'Add todo'}
                    aria-label={currentTodo.id ? 'Update todo' : 'Add todo'}>
                    {currentTodo.id ? <UpdateIcon /> : <AddIcon />}
                </button>
            </div>

            {currentTodo.id && (
                <button
                    className="cancel-btn"
                    type="button"
                    title="Cancel Edit"
                    onClick={cancelEditTodo}
                    aria-label="Cancel Edit">
                    <AddIcon />
                </button>
            )}
        </form>
    );
};
