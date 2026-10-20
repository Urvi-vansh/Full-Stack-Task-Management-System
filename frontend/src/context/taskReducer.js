export const initialState = {
  tasks: [],
  currentTask: null,
  stats: {
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
    completionRate: 0,
    priorityDistribution: { Low: 0, Medium: 0, High: 0 },
  },
  loading: false,
  detailLoading: false,
  statsLoading: false,
  error: null,
  toasts: [],
};

export const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_ERROR: 'FETCH_TASKS_ERROR',

  SET_DETAIL_LOADING: 'SET_DETAIL_LOADING',
  FETCH_TASK_BY_ID_SUCCESS: 'FETCH_TASK_BY_ID_SUCCESS',
  FETCH_TASK_BY_ID_ERROR: 'FETCH_TASK_BY_ID_ERROR',

  SET_STATS_LOADING: 'SET_STATS_LOADING',
  FETCH_STATS_SUCCESS: 'FETCH_STATS_SUCCESS',

  CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
  UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
  DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',

  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    case ACTION_TYPES.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: null,
      };

    case ACTION_TYPES.FETCH_TASKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ACTION_TYPES.SET_DETAIL_LOADING:
      return { ...state, detailLoading: action.payload };

    case ACTION_TYPES.FETCH_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        currentTask: action.payload,
        error: null,
      };

    case ACTION_TYPES.FETCH_TASK_BY_ID_ERROR:
      return {
        ...state,
        detailLoading: false,
        currentTask: null,
        error: action.payload,
      };

    case ACTION_TYPES.SET_STATS_LOADING:
      return { ...state, statsLoading: action.payload };

    case ACTION_TYPES.FETCH_STATS_SUCCESS:
      return {
        ...state,
        statsLoading: false,
        stats: action.payload,
      };

    case ACTION_TYPES.CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        error: null,
      };

    case ACTION_TYPES.UPDATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
        currentTask:
          state.currentTask && state.currentTask._id === action.payload._id
            ? action.payload
            : state.currentTask,
        error: null,
      };

    case ACTION_TYPES.DELETE_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        currentTask:
          state.currentTask && state.currentTask._id === action.payload
            ? null
            : state.currentTask,
        error: null,
      };

    case ACTION_TYPES.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload],
      };

    case ACTION_TYPES.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.payload),
      };

    case ACTION_TYPES.CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
