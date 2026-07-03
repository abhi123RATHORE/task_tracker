import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';

/**
 * Format minutes into a readable string (e.g., "2h 15m")
 */
export function formatDuration(totalMinutes) {
  if (!totalMinutes) return '0m';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

export default function TimeEntryList({ entries = [], loading = false }) {
  if (loading) {
    return (
      <div className="space-y-3 mt-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-16 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 mt-4">
        <AccessTimeRoundedIcon className="text-slate-300 dark:text-slate-600 mb-2" fontSize="large" />
        <p className="text-slate-500 text-sm">No time entries logged yet.</p>
      </div>
    );
  }

  const totalMinutes = entries.reduce((acc, entry) => acc + (entry.durationMinutes || 0), 0);

  return (
    <div className="mt-4">
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-start justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="mt-0.5 text-indigo-400">
                <NoteAltRoundedIcon fontSize="small" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  {entry.note || <span className="italic opacity-50">No note provided</span>}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(entry.loggedAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 px-2 py-1 rounded text-xs font-bold">
                <AccessTimeRoundedIcon sx={{ fontSize: 12 }} />
                {formatDuration(entry.durationMinutes)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
        <span className="font-semibold text-slate-600 dark:text-slate-400 text-sm">
          Total Time Logged
        </span>
        <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
          {formatDuration(totalMinutes)}
        </span>
      </div>
    </div>
  );
}
