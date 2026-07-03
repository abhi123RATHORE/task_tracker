/**
 * Application-wide constants for the Task & Time Tracker.
 * Centralises enum values, display labels, colors, and status transition rules.
 */

// ─── Status ─────────────────────────────────────────────────────────────────────

export const STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
};

export const STATUS_LABELS = {
  [STATUS.TODO]: 'To Do',
  [STATUS.IN_PROGRESS]: 'In Progress',
  [STATUS.DONE]: 'Done',
};

export const STATUS_COLORS = {
  [STATUS.TODO]: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-300 dark:border-amber-700' },
  [STATUS.IN_PROGRESS]: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-300 dark:border-blue-700' },
  [STATUS.DONE]: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700' },
};

/**
 * Allowed status transitions.
 * Business rule: a task cannot move directly from TODO to DONE —
 * it must pass through IN_PROGRESS first.
 */
export const ALLOWED_TRANSITIONS = {
  [STATUS.TODO]: [STATUS.IN_PROGRESS],
  [STATUS.IN_PROGRESS]: [STATUS.TODO, STATUS.DONE],
  [STATUS.DONE]: [STATUS.IN_PROGRESS],
};

// ─── Priority ───────────────────────────────────────────────────────────────────

export const PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
};

export const PRIORITY_LABELS = {
  [PRIORITY.LOW]: 'Low',
  [PRIORITY.MEDIUM]: 'Medium',
  [PRIORITY.HIGH]: 'High',
};

export const PRIORITY_COLORS = {
  [PRIORITY.LOW]: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700' },
  [PRIORITY.MEDIUM]: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-300 dark:border-orange-700' },
  [PRIORITY.HIGH]: { bg: 'bg-rose-100 dark:bg-rose-900/30', text: 'text-rose-700 dark:text-rose-400', border: 'border-rose-300 dark:border-rose-700' },
};

// ─── Validation ─────────────────────────────────────────────────────────────────

export const VALIDATION = {
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  TIME_ENTRY_MIN_MINUTES: 1,
  TIME_ENTRY_MAX_MINUTES: 480, // 8 hours
  NOTE_MAX_LENGTH: 255,
};

// ─── Status Pipeline Order ──────────────────────────────────────────────────────

export const STATUS_PIPELINE = [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE];
