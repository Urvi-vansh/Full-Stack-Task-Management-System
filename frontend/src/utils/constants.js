export const STATUS_OPTIONS = ['Pending', 'In Progress', 'Completed'];

export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High'];

export const STATUS_CONFIG = {
  Pending: {
    label: 'Pending',
    badgeClass: 'badge-status-pending',
    color: '#d97706',
  },
  'In Progress': {
    label: 'In Progress',
    badgeClass: 'badge-status-inprogress',
    color: '#2563eb',
  },
  Completed: {
    label: 'Completed',
    badgeClass: 'badge-status-completed',
    color: '#059669',
  },
};

export const PRIORITY_CONFIG = {
  Low: {
    label: 'Low',
    badgeClass: 'badge-priority-low',
    color: '#475569',
  },
  Medium: {
    label: 'Medium',
    badgeClass: 'badge-priority-medium',
    color: '#c2410c',
  },
  High: {
    label: 'High',
    badgeClass: 'badge-priority-high',
    color: '#b91c1c',
  },
};

export const SORT_OPTIONS = [
  { label: 'Recently Created', value: 'createdAt-desc' },
  { label: 'Oldest Created', value: 'createdAt-asc' },
  { label: 'Due Date (Earliest)', value: 'dueDate-asc' },
  { label: 'Due Date (Latest)', value: 'dueDate-desc' },
  { label: 'Title (A-Z)', value: 'title-asc' },
  { label: 'Title (Z-A)', value: 'title-desc' },
];
