import { STATUS_LABELS, STATUS_COLORS, STATUS } from '../../constants';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const ICONS = {
  [STATUS.TODO]: AccessTimeRoundedIcon,
  [STATUS.IN_PROGRESS]: PlayCircleOutlineRoundedIcon,
  [STATUS.DONE]: CheckCircleOutlineRoundedIcon,
};

/**
 * Tailwind-styled status badge with appropriate icon and colors.
 */
export default function StatusBadge({ status, className = '' }) {
  const label = STATUS_LABELS[status] || status;
  const colors = STATUS_COLORS[status] || { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600', border: 'border-slate-200' };
  const Icon = ICONS[status] || AccessTimeRoundedIcon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border} ${className}`}
    >
      <Icon sx={{ fontSize: 14 }} />
      {label}
    </span>
  );
}
