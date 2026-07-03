import { useState, useEffect } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { useTasks } from '../hooks/useTasks';
import { useNotification } from '../hooks/useNotification';
import { STATUS } from '../constants';

import FilterBar from '../components/tasks/FilterBar';
import TaskCard from '../components/tasks/TaskCard';
import TaskFormDialog from '../components/tasks/TaskFormDialog';
import TaskDetailDialog from '../components/tasks/TaskDetailDialog';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

export default function Dashboard() {
  const notify = useNotification();
  const {
    tasks,
    loading,
    error,
    pagination,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    changeStatus,
  } = useTasks();

  // Filter State
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  // Dialog States
  const [formConfig, setFormConfig] = useState({ open: false, mode: 'create', data: null });
  const [detailTask, setDetailTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchTasks({ status: statusFilter, priority: priorityFilter, page: currentPage });
  }, [statusFilter, priorityFilter, currentPage, fetchTasks]);

  // Reset page to 0 when filters change
  const handleStatusChange = (val) => {
    setCurrentPage(0);
    setStatusFilter(val);
  };
  const handlePriorityChange = (val) => {
    setCurrentPage(0);
    setPriorityFilter(val);
  };

  // Handle Form Submit (Create/Edit)
  const handleFormSubmit = async (formData) => {
    try {
      if (formConfig.mode === 'create') {
        await addTask(formData);
        notify.success('Task created successfully');
        // Go to first page to see the new task (latest first)
        setCurrentPage(0);
      } else {
        await editTask(formConfig.data.id, formData);
        notify.success('Task updated successfully');
      }
      fetchTasks({ status: statusFilter, priority: priorityFilter, page: formConfig.mode === 'create' ? 0 : currentPage });
      
      // If details dialog is open for the edited task, close it to avoid stale data
      if (formConfig.mode === 'edit' && detailTask?.id === formConfig.data.id) {
        setDetailTask(null);
      }
    } catch (err) {
      notify.error(err.userMessage || `Failed to ${formConfig.mode} task`);
      throw err;
    }
  };

  // Handle Delete
  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await removeTask(deleteId);
      notify.success('Task deleted successfully');
      setDeleteId(null);
      fetchTasks({ status: statusFilter, priority: priorityFilter, page: currentPage });
    } catch (err) {
      notify.error(err.userMessage || 'Failed to delete task. It may have logged time entries.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle Status Change (from details view)
  const handleStatusChange2 = async (taskId, newStatus) => {
    await changeStatus(taskId, newStatus);
    fetchTasks({ status: statusFilter, priority: priorityFilter, page: currentPage });
    
    // Update local detail view state immediately for snappier UI
    if (detailTask && detailTask.id === taskId) {
      setDetailTask({ ...detailTask, statusEnum: newStatus });
    }
  };

  // Stats for the hero section
  const stats = {
    total: pagination.totalElements,
    todo: tasks.filter((t) => t.statusEnum === STATUS.TODO).length,
    inProgress: tasks.filter((t) => t.statusEnum === STATUS.IN_PROGRESS).length,
    done: tasks.filter((t) => t.statusEnum === STATUS.DONE).length,
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        {/* Decorative gradient blob */}
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400/20 to-violet-400/20 blur-2xl pointer-events-none" />
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2">
              Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Manage your tasks efficiently. You have{' '}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{stats.total}</span>{' '}
              total tasks.
            </p>
          </div>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<AddRoundedIcon />}
            onClick={() => setFormConfig({ open: true, mode: 'create', data: null })}
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.2,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.45)',
              },
            }}
          >
            New Task
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="relative grid grid-cols-3 gap-4 mt-6">
          <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40">
              <AssignmentRoundedIcon className="text-amber-600 dark:text-amber-400" fontSize="small" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">{stats.todo}</p>
              <p className="text-xs font-medium text-amber-600/70 dark:text-amber-400/70">To Do</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/40 rounded-2xl p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40">
              <PlayCircleFilledRoundedIcon className="text-blue-600 dark:text-blue-400" fontSize="small" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{stats.inProgress}</p>
              <p className="text-xs font-medium text-blue-600/70 dark:text-blue-400/70">In Progress</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl p-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40">
              <CheckCircleRoundedIcon className="text-emerald-600 dark:text-emerald-400" fontSize="small" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{stats.done}</p>
              <p className="text-xs font-medium text-emerald-600/70 dark:text-emerald-400/70">Done</p>
            </div>
          </div>
        </div>
      </div>

      <FilterBar
        status={statusFilter}
        priority={priorityFilter}
        onStatusChange={handleStatusChange}
        onPriorityChange={handlePriorityChange}
      />

      {error ? (
        <EmptyState
          message="Failed to load tasks"
          description={error}
          action={<Button onClick={() => fetchTasks({ page: currentPage })}>Try Again</Button>}
        />
      ) : loading ? (
        <LoadingSpinner count={6} message="Fetching your tasks..." />
      ) : tasks.length === 0 ? (
        <EmptyState
          message={statusFilter || priorityFilter ? 'No tasks match your filters' : 'Your board is clear!'}
          description={statusFilter || priorityFilter ? 'Try adjusting your filters.' : 'Create a new task to get started.'}
          action={
            (statusFilter || priorityFilter) ? (
              <Button 
                variant="outlined" 
                startIcon={<SearchOffRoundedIcon />}
                onClick={() => { handleStatusChange(''); handlePriorityChange(''); }}
              >
                Clear Filters
              </Button>
            ) : null
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onViewDetails={() => setDetailTask(task)}
                onEdit={() => setFormConfig({ open: true, mode: 'edit', data: task })}
                onDelete={() => setDeleteId(task.id)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-2">
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 shadow-sm">
                <Tooltip title="First page">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => setCurrentPage(0)}
                      disabled={currentPage === 0}
                    >
                      <FirstPageRoundedIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Previous page">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                      disabled={currentPage === 0}
                    >
                      <ChevronLeftRoundedIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>

                <div className="flex items-center gap-1 px-3">
                  {/* Page number buttons */}
                  {Array.from({ length: pagination.totalPages }, (_, i) => i)
                    .filter((page) => {
                      // Show first, last, current, and adjacent pages
                      if (page === 0 || page === pagination.totalPages - 1) return true;
                      if (Math.abs(page - currentPage) <= 1) return true;
                      return false;
                    })
                    .reduce((acc, page, idx, arr) => {
                      // Add ellipsis markers
                      if (idx > 0 && page - arr[idx - 1] > 1) {
                        acc.push('...' + page);
                      }
                      acc.push(page);
                      return acc;
                    }, [])
                    .map((item) => {
                      if (typeof item === 'string') {
                        return (
                          <span key={item} className="text-slate-400 dark:text-slate-500 text-sm px-1">
                            …
                          </span>
                        );
                      }
                      return (
                        <button
                          key={item}
                          onClick={() => setCurrentPage(item)}
                          className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all duration-150 ${
                            item === currentPage
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {item + 1}
                        </button>
                      );
                    })}
                </div>

                <Tooltip title="Next page">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages - 1, p + 1))}
                      disabled={currentPage >= pagination.totalPages - 1}
                    >
                      <ChevronRightRoundedIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Last page">
                  <span>
                    <IconButton
                      size="small"
                      onClick={() => setCurrentPage(pagination.totalPages - 1)}
                      disabled={currentPage >= pagination.totalPages - 1}
                    >
                      <LastPageRoundedIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </div>

              <span className="text-xs text-slate-500 dark:text-slate-400 ml-3">
                {pagination.totalElements} task{pagination.totalElements !== 1 ? 's' : ''} total
              </span>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <TaskFormDialog
        open={formConfig.open}
        mode={formConfig.mode}
        initialData={formConfig.data}
        onClose={() => setFormConfig({ open: false, mode: 'create', data: null })}
        onSubmit={handleFormSubmit}
      />

      <TaskDetailDialog
        open={!!detailTask}
        task={detailTask}
        onClose={() => setDetailTask(null)}
        onStatusChange={handleStatusChange2}
      />

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone. If time has been logged against this task, deletion will fail."
        confirmText="Delete"
        loading={isDeleting}
      />
    </div>
  );
}