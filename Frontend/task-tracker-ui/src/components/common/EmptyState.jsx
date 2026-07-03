import InboxRoundedIcon from '@mui/icons-material/InboxRounded';

/**
 * Empty state component with icon, message, and optional CTA.
 *
 * @param {Object} props
 * @param {string}  [props.message='No items found']
 * @param {string}  [props.description]
 * @param {React.ReactNode} [props.action] – e.g. a Button
 */
export default function EmptyState({
  message = 'No items found',
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-5 mb-5">
        <InboxRoundedIcon
          sx={{ fontSize: 48 }}
          className="text-slate-400 dark:text-slate-500"
        />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">
        {message}
      </h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
