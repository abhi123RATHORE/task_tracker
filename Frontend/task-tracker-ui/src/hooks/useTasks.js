import { useState, useCallback } from 'react';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  updateStatus,
} from '../services/taskService';

/**
 * Custom hook encapsulating all task CRUD operations with loading, error,
 * and pagination state. Handles Spring Boot Page<T> response shape.
 */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 0,
    totalPages: 0,
    totalElements: 0,
    size: 10,
  });

  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllTasks(filters);
      const pageData = response.data;

      // Spring Boot Page response: { content, totalPages, totalElements, number, size, ... }
      setTasks(pageData.content || []);
      setPagination({
        page: pageData.number ?? 0,
        totalPages: pageData.totalPages ?? 1,
        totalElements: pageData.totalElements ?? 0,
        size: pageData.size ?? 10,
      });
    } catch (err) {
      setError(err.userMessage || 'Failed to load tasks');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (task) => {
    const response = await createTask(task);
    return response.data;
  }, []);

  const editTask = useCallback(async (id, task) => {
    const response = await updateTask(id, task);
    return response.data;
  }, []);

  const removeTask = useCallback(async (id) => {
    await deleteTask(id);
  }, []);

  const changeStatus = useCallback(async (id, status) => {
    const response = await updateStatus(id, status);
    return response.data;
  }, []);

  return {
    tasks,
    loading,
    error,
    pagination,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    changeStatus,
  };
}
