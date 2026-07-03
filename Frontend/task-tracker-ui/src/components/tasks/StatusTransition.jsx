import { Button, CircularProgress } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import { STATUS, STATUS_PIPELINE, STATUS_LABELS, ALLOWED_TRANSITIONS } from '../../constants';

export default function StatusTransition({ currentStatus, onStatusChange, isUpdating }) {
  const allowedNext = ALLOWED_TRANSITIONS[currentStatus] || [];
  
  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Task Pipeline
      </h4>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        {STATUS_PIPELINE.map((status, index) => {
          const isCurrent = status === currentStatus;
          const isAllowed = allowedNext.includes(status);
          const isPast = STATUS_PIPELINE.indexOf(status) < STATUS_PIPELINE.indexOf(currentStatus);
          
          return (
            <div key={status} className="flex items-center">
              <Button
                variant={isCurrent ? 'contained' : 'outlined'}
                color={
                  isCurrent
                    ? status === STATUS.DONE ? 'success' : 'primary'
                    : 'inherit'
                }
                disabled={!isCurrent && !isAllowed || isUpdating}
                onClick={() => onStatusChange(status)}
                startIcon={
                  isUpdating && isAllowed ? <CircularProgress size={16} /> :
                  isPast ? <CheckCircleRoundedIcon className="text-emerald-500" /> : null
                }
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  opacity: (!isCurrent && !isAllowed && !isPast) ? 0.5 : 1,
                  borderColor: isPast ? 'success.main' : undefined,
                  color: isPast ? 'success.main' : undefined,
                }}
              >
                {STATUS_LABELS[status]}
              </Button>
              
              {index < STATUS_PIPELINE.length - 1 && (
                <ArrowRightAltRoundedIcon
                  className={`hidden sm:block ml-4 ${
                    isPast ? 'text-emerald-400' : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      
      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
        Business Rule: Tasks must transition sequentially. TODO → IN PROGRESS → DONE.
      </p>
    </div>
  );
}
