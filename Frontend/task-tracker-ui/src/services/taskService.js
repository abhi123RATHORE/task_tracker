import api from '../api/axiosConfig';

/**
 * Fetch all tasks with pagination, optionally filtered by status and/or priority.
 * @param {{ status?: string, priority?: string, page?: number, size?: number }} filters
 */
export const getAllTasks = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status) params.append('statusEnum', filters.status);
  if (filters.priority) params.append('priorityEnum', filters.priority);
  params.append('page', String(filters.page ?? 0));
  params.append('size', String(filters.size ?? 10));

  const query = params.toString();
  return api.get(`/tasks${query ? `?${query}` : ''}`);
};

/** Fetch a single task by ID. */
export const getTaskById = (id) => api.get(`/tasks/${id}`);

/** Create a new task. */
export const createTask = (task) => api.post('/tasks', task);

/** Update an existing task (full update). */
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);

/** Delete a task by ID. */
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

/** Patch only the status of a task. */
export const updateStatus = (id, status) =>
  api.patch(`/tasks/${id}/status?statusEnum=${status}`);

/**
 * Fetch the summary — total time logged per task and overall totals.
 */
export const getSummary = () => api.get('/summary');
