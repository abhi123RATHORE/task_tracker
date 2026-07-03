import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import { useState } from 'react';

import StatusBadge from '../common/StatusBadge';
import PriorityBadge from '../common/PriorityBadge';
import { PRIORITY } from '../../constants';

export default function TaskCard({ task, onEdit, onDelete, onViewDetails }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setAnchorEl(null);
  };

  const handleAction = (e, action) => {
    e.stopPropagation();
    handleClose();
    action();
  };

  // Visual left border accent based on priority
  const priorityAccent =
    task.priorityEnum === PRIORITY.HIGH
      ? 'border-l-rose-500 dark:border-l-rose-400'
      : task.priorityEnum === PRIORITY.MEDIUM
        ? 'border-l-amber-500 dark:border-l-amber-400'
        : 'border-l-emerald-500 dark:border-l-emerald-400';

  const dateStr = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div
      onClick={onViewDetails}
      className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 dark:hover:shadow-indigo-400/5 transition-all duration-300 cursor-pointer border-l-4 ${priorityAccent} hover:-translate-y-0.5`}
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
          {task.title}
        </h3>
        
        {/* Actions Menu */}
        <div onClick={(e) => e.stopPropagation()}>
          <IconButton
            size="small"
            onClick={handleMenuClick}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 -mr-2"
            sx={{
              opacity: 0.5,
              '&:hover': { opacity: 1 },
              transition: 'opacity 0.15s ease',
            }}
          >
            <MoreVertRoundedIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={(e) => handleAction(e, onViewDetails)}>
              <ListItemIcon>
                <OpenInNewRoundedIcon fontSize="small" />
              </ListItemIcon>
              View Details
            </MenuItem>
            <MenuItem onClick={(e) => handleAction(e, onEdit)}>
              <ListItemIcon>
                <EditRoundedIcon fontSize="small" />
              </ListItemIcon>
              Edit Task
            </MenuItem>
            <MenuItem
              onClick={(e) => handleAction(e, onDelete)}
              className="!text-rose-600 dark:!text-rose-400"
            >
              <ListItemIcon>
                <DeleteOutlineRoundedIcon fontSize="small" color="error" />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 line-clamp-3 min-h-[3rem] leading-relaxed">
        {task.description || <span className="italic opacity-50">No description provided.</span>}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-2">
          <StatusBadge status={task.statusEnum} />
          <PriorityBadge priority={task.priorityEnum} />
        </div>
        
        <Tooltip title="Created date">
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
            <CalendarTodayRoundedIcon sx={{ fontSize: 13 }} />
            {dateStr}
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
