import { Chip, Stack, IconButton, Tooltip } from '@mui/material';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../constants';

export default function FilterBar({
  status,
  priority,
  onStatusChange,
  onPriorityChange,
}) {
  const activeFilterCount = (status ? 1 : 0) + (priority ? 1 : 0);
  const hasFilters = activeFilterCount > 0;

  const clearFilters = () => {
    onStatusChange('');
    onPriorityChange('');
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 p-2 rounded-lg">
          <FilterListRoundedIcon fontSize="small" />
        </div>
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          Filters
          {activeFilterCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-indigo-600 text-white rounded-full">
              {activeFilterCount}
            </span>
          )}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Status Filters */}
        <Stack direction="row" spacing={1} alignItems="center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-1">
            Status:
          </span>
          <Chip
            label="All"
            size="small"
            onClick={() => onStatusChange('')}
            color={!status ? 'primary' : 'default'}
            variant={!status ? 'filled' : 'outlined'}
          />
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              size="small"
              onClick={() => onStatusChange(key)}
              color={status === key ? 'primary' : 'default'}
              variant={status === key ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>

        <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700" />

        {/* Priority Filters */}
        <Stack direction="row" spacing={1} alignItems="center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-1">
            Priority:
          </span>
          <Chip
            label="All"
            size="small"
            onClick={() => onPriorityChange('')}
            color={!priority ? 'primary' : 'default'}
            variant={!priority ? 'filled' : 'outlined'}
          />
          {Object.entries(PRIORITY_LABELS).map(([key, label]) => (
            <Chip
              key={key}
              label={label}
              size="small"
              onClick={() => onPriorityChange(key)}
              color={priority === key ? 'primary' : 'default'}
              variant={priority === key ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>

        {/* Clear Filters */}
        {hasFilters && (
          <Tooltip title="Clear all filters">
            <IconButton size="small" onClick={clearFilters} className="ml-auto">
              <ClearRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
