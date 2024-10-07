import React from 'react';

/**
 * DeleteIcon Component
 *
 * This component renders an SVG icon representing a "delete" symbol.
 *
 * @returns {JSX.Element} A React component displaying a delete/trash icon.
 */
export const DeleteIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 384 384">
      <path
        fill="#fff"
        d="M64 341.333C64 364.907 83.093 384 106.667 384h170.667C300.907 384 320 364.907 320 341.333v-256H64v256zm202.667-320L245.333 0H138.667l-21.334 21.333H42.667V64h298.666V21.333z"
        data-original="#000000"></path>
    </svg>
  );
};
