/**
 * Formats an ISO date string into a user-friendly display date.
 * Example: "Oct 24, 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

/**
 * Formats an ISO date string into relative time.
 * Example: "In 2 days", "Tomorrow", "Yesterday", "2 days ago"
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays === -1) return 'Due yesterday';
  if (diffDays > 1) return `Due in ${diffDays} days`;
  return `Overdue by ${Math.abs(diffDays)} days`;
};

/**
 * Formats date for HTML input type="date" (YYYY-MM-DD)
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Checks if a task is overdue (dueDate in the past and status is not Completed)
 */
export const isTaskOverdue = (dueDate, status) => {
  if (!dueDate || status === 'Completed') return false;
  const due = new Date(dueDate);
  const today = new Date();
  // Zero out today's hours for clean day-level comparison
  today.setHours(0, 0, 0, 0);
  return due < today;
};
