import { PRIORITY_LABELS, PRIORITY_COLORS, PRIORITY } from '../../constants';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const ICONS = {
  [PRIORITY.LOW]: KeyboardArrowDownRoundedIcon,
  [PRIORITY.MEDIUM]: RemoveRoundedIcon,
  [PRIORITY.HIGH]: KeyboardArrowUpRoundedIcon,
};

/**
 * Tailwind-styled priority badge with directional icons and color coding.
 */
export default function PriorityBadge({ priority, className = '' }) {
  const label = PRIORITY_LABELS[priority] || priority;
  const colors = PRIORITY_COLORS[priority] || { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' };
  const Icon = ICONS[priority] || RemoveRoundedIcon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border} ${className}`}
    >
      <Icon sx={{ fontSize: 16 }} />
      {label}
    </span>
  );
}
