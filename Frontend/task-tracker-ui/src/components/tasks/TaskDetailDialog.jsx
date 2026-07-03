import { useState, useEffect } from 'react';
import { Dialog, IconButton, Divider } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import StatusTransition from './StatusTransition';
import TimeEntryForm from '../time/TimeEntryForm';
import TimeEntryList from '../time/TimeEntryList';

import { getTimeEntries, createTimeEntry } from '../../services/timeEntryService';
import { useNotification } from '../../hooks/useNotification';

export default function TaskDetailDialog({
  open,
  task,
  onClose,
  onStatusChange,
}) {
  const notify = useNotification();
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (open && task?.id) {
      loadTimeEntries();
    }
  }, [open, task?.id]);

  const loadTimeEntries = async () => {
    setLoadingEntries(true);
    try {
      const res = await getTimeEntries(task.id);
      setEntries(res.data);
    } catch (err) {
      notify.error('Failed to load time entries');
    } finally {
      setLoadingEntries(false);
    }
  };

  const handleTimeEntrySubmit = async (entryData) => {
    try {
      await createTimeEntry(task.id, entryData);
      notify.success('Time entry logged successfully');
      // Reload entries to get the new one and update total
      loadTimeEntries();
    } catch (err) {
      notify.error(err.userMessage || 'Failed to log time entry');
      throw err; // Let the form know it failed
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      await onStatusChange(task.id, newStatus);
      notify.success(`Task moved to ${newStatus.replace('_', ' ')}`);
    } catch (err) {
      notify.error(err.userMessage || 'Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Header */}
      <div className="flex justify-between items-start p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="pr-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            {task.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status={task.statusEnum} />
            <PriorityBadge priority={task.priorityEnum} />
            <span className="text-sm text-slate-500">
              Created {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <IconButton onClick={onClose} size="small" className="absolute top-4 right-4">
          <CloseRoundedIcon />
        </IconButton>
      </div>

      <div className="flex flex-col md:flex-row h-full">
        {/* Left Column: Details & Status */}
        <div className="flex-1 p-6 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
              {task.description || <span className="italic opacity-50">No description provided.</span>}
            </p>
          </div>

          <Divider className="my-6" />

          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Status Workflow
            </h3>
            <StatusTransition
              currentStatus={task.statusEnum}
              onStatusChange={handleStatusChange}
              isUpdating={updatingStatus}
            />
          </div>
        </div>

        {/* Right Column: Time Tracking */}
        <div className="w-full md:w-2/5 p-6 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40">
              <AccessTimeRoundedIcon className="text-indigo-600 dark:text-indigo-400" sx={{ fontSize: 18 }} />
            </div>
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
              Log Time
            </h3>
          </div>

          <TimeEntryForm taskId={task.id} onSubmit={handleTimeEntrySubmit} />
          
          <div className="my-6 border-t border-slate-200 dark:border-slate-700" />
          
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Time Entries
          </h3>
          <TimeEntryList entries={entries} loading={loadingEntries} />
        </div>
      </div>
    </Dialog>
  );
}
