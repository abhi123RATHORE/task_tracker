import api from '../api/axiosConfig';

/** Fetch all time entries for a given task. */
export const getTimeEntries = (taskId) =>
  api.get(`/tasks/${taskId}/time-entries`);

/** Create a new time entry against a task. */
export const createTimeEntry = (taskId, entry) =>
  api.post(`/tasks/${taskId}/time-entries`, entry);