import React from 'react';
import { useStateContext } from '../context/StateContext';
import { useTodos } from '../hooks/useTodo';
import '../assets/css/filters.css';

/**
 * Filters Component
 *
 * This component renders a set of filter buttons based on the available filter options.
 * It allows the user to filter the todo list by different categories (all, done, remaining).
 *
 * The current active filter is highlighted, and clicking on a filter button will change the
 * active filter through the `handleFilterChange` function.
 *
 * @returns {JSX.Element} A React component that displays filter buttons.
 */
export const Filters = () => {
    const { filters, filter } = useStateContext(); // Destructure filters and current active filter from context.
    const { handleFilterChange } = useTodos(); // Get function to handle filter changes.

    return (
        /**
         * Wrapper for the filter buttons.
         *
         * Group the buttons as a set of related controls for screen readers.
         */
        <div className="filters-wrap" role="group" aria-label="Filter todos">
            {/* Map through filters and create a button for each */}
            {filters.map((fil) => (
                <button
                    // Add active class to the button if it's the current filter.
                    className={`filter-btn${filter === fil.type ? ' filter-btn-active' : ''}`}
                    key={fil.type}
                    type="button"
                    onClick={() => handleFilterChange(fil.type)}
                    aria-pressed={filter === fil.type} // Indicate if the button is currently active.
                    aria-label={`Filter todos by ${fil.title}`}>
                    {fil.title}
                </button>
            ))}
        </div>
    );
};
