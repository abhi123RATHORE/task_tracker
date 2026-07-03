import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

import { getSummary, getAllTasks } from '../services/taskService';
import { getTimeEntries } from '../services/timeEntryService';
import { useNotification } from '../hooks/useNotification';

import SummaryChart from '../components/summary/SummaryChart';
import SummaryTable from '../components/summary/SummaryTable';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { formatDuration } from '../components/time/TimeEntryList';

export default function Summary() {
  const notify = useNotification();
  const [data, setData] = useState([]);
  const [overallMinutes, setOverallMinutes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummaryData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Hit the summary endpoint
      const response = await getSummary();
      const summaryPayload = response.data;

      // Backend returns: { overallMinutes: N, tasks: [{ taskId, title, totalMinutes }, ...] }
      // Map to the shape the UI components expect
      const tasks = (summaryPayload.tasks || []).map((t) => ({
        taskId: t.taskId,
        taskTitle: t.title,
        totalMinutes: t.totalMinutes,
      }));

      setData(tasks.filter((d) => d.totalMinutes > 0));
      setOverallMinutes(summaryPayload.overallMinutes || 0);
    } catch (err) {
      // If endpoint doesn't exist (e.g. 404), compute client-side
      if (err.response?.status === 404) {
        console.log('Summary endpoint not found, computing client-side...');
        await computeSummaryClientSide();
      } else {
        setError(err.userMessage || 'Failed to load summary data');
        notify.error('Failed to load summary data');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fallback function if backend doesn't have a specific /summary endpoint
  const computeSummaryClientSide = async () => {
    try {
      const tasksRes = await getAllTasks({ size: 1000 });
      const tasks = tasksRes.data.content || tasksRes.data || [];
      
      const summaryData = await Promise.all(
        tasks.map(async (task) => {
          try {
            const timeRes = await getTimeEntries(task.id);
            const totalMinutes = timeRes.data.reduce((sum, entry) => sum + (entry.durationMinutes || 0), 0);
            return {
              taskId: task.id,
              taskTitle: task.title,
              status: task.statusEnum,
              totalMinutes,
            };
          } catch (e) {
            return {
              taskId: task.id,
              taskTitle: task.title,
              status: task.statusEnum,
              totalMinutes: 0,
            };
          }
        })
      );
      
      const filtered = summaryData.filter((d) => d.totalMinutes > 0);
      setData(filtered);
      setOverallMinutes(filtered.reduce((acc, d) => acc + d.totalMinutes, 0));
    } catch (err) {
      setError('Failed to compute summary data');
    }
  };

  useEffect(() => {
    fetchSummaryData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        {/* Decorative gradient blob */}
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
              <BarChartRoundedIcon className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-1">
                Time Summary
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Total time logged across all tasks:{' '}
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-base">
                  {formatDuration(overallMinutes)}
                </span>
              </p>
            </div>
          </div>
          
          <Button
            variant="outlined"
            startIcon={<RefreshRoundedIcon />}
            onClick={fetchSummaryData}
            disabled={loading}
            sx={{ borderRadius: 3, px: 3 }}
          >
            Refresh Data
          </Button>
        </div>
      </div>

      {error ? (
        <EmptyState
          message="Failed to load summary"
          description={error}
          action={<Button onClick={fetchSummaryData}>Try Again</Button>}
        />
      ) : loading ? (
        <LoadingSpinner count={1} message="Calculating time totals..." />
      ) : data.length === 0 ? (
        <EmptyState
          message="No time logged yet"
          description="Log time on your tasks to see the summary chart and breakdown."
        />
      ) : (
        <div className="space-y-6">
          {/* Chart Section */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
              Time Distribution
            </h2>
            <SummaryChart data={data} />
          </div>

          {/* Table Section */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
              Task Breakdown
            </h2>
            <SummaryTable data={data} />
          </div>
        </div>
      )}
    </div>
  );
}

// VITE_API_BASE_URL=http://localhost:8080/api