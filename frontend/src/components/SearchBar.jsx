import React from 'react';
import './SearchBar.css';

/**
 * SearchBar Component
 * Provides clean search input with clear button and clear accessibility attributes.
 */
export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search tasks by title or description...',
}) => {
  return (
    <div className="search-bar-wrapper">
      <label htmlFor="task-search-input" className="sr-only">
        Search tasks
      </label>
      <div className="search-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      <input
        id="task-search-input"
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />

      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={onClear}
          aria-label="Clear search input"
          title="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchBar;
