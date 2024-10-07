import { useEffect } from 'react';
import { useStateContext } from '../context/StateContext';

/**
 * Custom Hook for Database Operations.
 *
 * This hook manages data persistence by saving to and retrieving from localStorage.
 * It provides functions to update and clear data stored in the context.
 *
 * @returns {Object} An object containing functions to update and clear data.
 */
export const useDB = () => {
  // Destructure the necessary values from the state context.
  const { DBKey, defaultData, data, setData } = useStateContext();

  // Save data to localStorage whenever it changes.
  useEffect(() => {
    if (data) {
      localStorage.setItem(DBKey, JSON.stringify(data));
    }
  }, [DBKey, data]); // Re-run effect if DBKey or data changes.

  /**
   * Update the stored data with new data.
   *
   * @param {Object} newData - The new data to merge into the existing data.
   */
  const updateData = (newData) => {
    setData((prevData) => ({
      ...prevData, // Retain previous data.
      ...newData // Merge with new data.
    }));
  };

  /**
   * Clear all stored data and reset to default.
   */
  const clearData = () => {
    setData(defaultData); // Reset data to default.
    localStorage.removeItem(DBKey); // Remove item from localStorage.
  };

  // Return functions to be used in components.
  return {
    updateData,
    clearData
  };
};
