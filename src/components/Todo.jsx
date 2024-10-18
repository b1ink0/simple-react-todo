import React from 'react';
import { useTodos } from '../hooks/useTodo';
import '../assets/css/todo.css';
import { DoneIcon } from '../assets/icons/DoneIcon';
import { EditIcon } from '../assets/icons/EditIcon';
import { DeleteIcon } from '../assets/icons/DeleteIcon';
import { AddIcon } from '../assets/icons/AddIcon';

/**
 * Todo Component
 *
 * This component renders a single todo item, displaying its title and action buttons
 * for marking it as done, editing it, or deleting it.
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.todo - The todo item to be rendered.
 *
 * @returns {JSX.Element} A React component displaying a todo item with action buttons.
 */
export const Todo = ({ todo }) => {
    // Destructure functions to handle todo actions.
    const { toggleTodoDone, editTodo, deleteTodoConfirm } = useTodos();

    return (
        // Wrapper for a todo item, adding 'todo-done-wrap' class if the todo is marked as done.
        <li className={`todo-wrap${todo.done ? ' todo-done-wrap' : ''}`}>
            <h2 className="todo-title" aria-label="Todo title">
                {todo.title}
            </h2>

            {/* Button group for todo actions */}
            <div className="todo-btn-wrap" role="group" aria-label="Todo actions">
                {/* Button to mark the todo as done or undo the done status */}
                <button
                    className="todo-btn todo-done-btn"
                    onClick={() => toggleTodoDone(todo.id)}
                    type="button"
                    aria-pressed={todo.done} // Indicates whether the todo is marked as done.
                    aria-label={todo.done ? 'Mark todo as not done' : 'Mark todo as done'}>
                    {todo.done ? <AddIcon /> : <DoneIcon />}{' '}
                </button>

                {/* Button to trigger editing of the todo */}
                <button
                    className="todo-btn todo-edit-btn"
                    onClick={() => editTodo(todo.id)}
                    type="button"
                    aria-label="Edit todo">
                    <EditIcon />
                </button>

                {/* Button to delete the todo */}
                <button
                    className="todo-btn todo-delete-btn"
                    onClick={() => deleteTodoConfirm(todo.id)}
                    type="button"
                    aria-label="Delete todo">
                    <DeleteIcon />
                </button>
            </div>
        </li>
    );
};
