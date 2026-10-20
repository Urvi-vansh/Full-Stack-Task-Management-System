import React from 'react';
import './StatisticsCard.css';

/**
 * StatisticsCard Component
 * Wrapped in React.memo to prevent unnecessary re-renders when parent states change
 * unless the specific card props (value, label, icon, etc.) have changed.
 */
export const StatisticsCard = React.memo(
  ({
    title,
    value,
    subtitle,
    icon,
    accentColor = 'blue',
    isLoading = false,
  }) => {
    return (
      <div className={`stat-card stat-accent-${accentColor}`}>
        <div className="stat-card-inner">
          <div className="stat-info">
            <span className="stat-title">{title}</span>
            <div className="stat-value-row">
              {isLoading ? (
                <span className="stat-skeleton"></span>
              ) : (
                <span className="stat-value">{value}</span>
              )}
            </div>
            {subtitle && <span className="stat-subtitle">{subtitle}</span>}
          </div>

          <div className="stat-icon-wrapper" aria-hidden="true">
            {icon}
          </div>
        </div>
      </div>
    );
  }
);

StatisticsCard.displayName = 'StatisticsCard';

export default StatisticsCard;
