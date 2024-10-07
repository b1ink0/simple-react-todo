import { useEffect, useCallback } from 'react';
import { useStateContext } from '../context/StateContext';
import { useDB } from './useDB';
import { generateId } from '../utils/utils';

/**
 * Custom Hook for Todo Management.
 *
 * This hook provides functionality for managing todos, including adding, editing, deleting,
 * and filtering todos. It also handles the interaction with localStorage for data persistence.
 *
 * @returns {Object} An object containing functions for managing todos and their state.
 */
export const useTodos = () => {
  // Destructure necessary state values and functions from the context.
  const { data, defaultTodo, currentTodo, setCurrentTodo, setCurrentTodos, filter, setFilter } =
    useStateContext();

  const { updateData, clearData } = useDB(); // Access functions to update and clear data.

  const { todos, config } = data; // Destructure todos and config from the data.

  // Change Handlers.

  /**
   * Handle changes in the title input.
   *
   * @param {Event} e - The input change event.
   */
  const handleTitleChange = (e) => {
    setCurrentTodo((prev) => ({
      ...prev,
      title: e.target.value // Update the title of the current todo.
    }));
  };

  /**
   * Handle filter change.
   *
   * @param {string} filter - The new filter type.
   */
  const handleFilterChange = (filter) => {
    setFilter(filter); // Update the filter in the state.
    updateConfig({ filter: filter }); // Update the config in the stored data.
  };

  /**
   * Add a new todo.
   *
   * @param {Event} e - The form submit event.
   */
  const addTodo = (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    updateData({ todos: [...todos, { ...currentTodo, id: generateId() }] });
    setCurrentTodo(defaultTodo); // Reset current todo to default.
  };

  /**
   * Toggle the completion status of a todo.
   *
   * @param {string} id - The ID of the todo to toggle.
   */
  const toggleTodoDone = (id) => {
    updateData({
      todos: todos.map((todo) => (id === todo.id ? { ...todo, done: !todo.done } : todo))
    });
  };

  /**
   * Edit an existing todo.
   *
   * @param {string} id - The ID of the todo to edit.
   */
  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id); // Find the todo by ID.
    if (todoToEdit) {
      setCurrentTodo(todoToEdit); // Set the current todo for editing.
    }
  };

  /**
   * Delete a todo.
   *
   * @param {string} id - The ID of the todo to delete.
   */
  const deleteTodo = (id) => {
    updateData({ todos: todos.filter((todo) => todo.id !== id) }); // Remove todo from list.

    if (id === currentTodo.id) {
      setCurrentTodo(defaultTodo); // Reset current todo if the deleted todo was currently being edited.
    }
  };

  /**
   * Update the current todo.
   *
   * @param {Event} e - The form submit event.
   */
  const updateTodo = (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    updateData({
      todos: todos.map((todo) => (todo.id === currentTodo.id ? currentTodo : todo))
    });
    setCurrentTodo(defaultTodo); // Reset current todo to default.
  };

  /**
   * Update the configuration for filters.
   *
   * @param {Object} newConfig - The new configuration settings.
   */
  const updateConfig = (newConfig) => {
    updateData({
      config: { ...config, ...newConfig } // Merge new config with existing config.
    });
  };

  /**
   * Filter todos based on the selected filter.
   */
  const filterTodos = useCallback(() => {
    setCurrentTodos(
      todos?.filter((todo) => {
        if ('done' === filter) {
          return true === todo.done; // Return only done todos.
        }
        if ('remaining' === filter) {
          return false === todo.done; // Return only remaining todos.
        }
        return true; // Return all todos if filter is 'all'.
      })
    );
  }, [filter, todos, setCurrentTodos]);

  /**
   * Clear all todos and reset state.
   */
  const clearAll = () => {
    clearData(); // Clear data from context and localStorage.
  };

  // Run the filterTodos function whenever filter or todos change.
  useEffect(() => {
    filterTodos();
  }, [filter, todos, filterTodos]);

  // Return functions to manage todos and their state.
  return {
    handleTitleChange,
    addTodo,
    toggleTodoDone,
    editTodo,
    deleteTodo,
    updateTodo,
    updateConfig,
    handleFilterChange,
    filterTodos,
    clearAll
  };
};
