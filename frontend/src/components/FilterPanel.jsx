import React from 'react';
import { STATUS_OPTIONS, PRIORITY_OPTIONS, SORT_OPTIONS } from '../utils/constants.js';
import './FilterPanel.css';

/**
 * FilterPanel Component
 * Provides intuitive controls for status filtering, priority filtering, and ordering.
 */
export const FilterPanel = ({
  status,
  priority,
  sortBy,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onReset,
  hasActiveFilters = false,
}) => {
  return (
    <div className="filter-panel card">
      <div className="filter-panel-content">
        {/* Status Filter */}
        <div className="filter-group">
          <label htmlFor="filter-status" className="filter-label">
            Status
          </label>
          <select
            id="filter-status"
            className="filter-select"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-group">
          <label htmlFor="filter-priority" className="filter-label">
            Priority
          </label>
          <select
            id="filter-priority"
            className="filter-select"
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
          >
            <option value="All">All Priorities</option>
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="filter-group">
          <label htmlFor="filter-sort" className="filter-label">
            Sort By
          </label>
          <select
            id="filter-sort"
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <div className="filter-action-group">
            <button
              type="button"
              className="btn btn-sm btn-secondary filter-reset-btn"
              onClick={onReset}
              title="Reset all search and filter criteria"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
