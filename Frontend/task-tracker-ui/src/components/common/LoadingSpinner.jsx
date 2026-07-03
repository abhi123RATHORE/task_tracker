/**
 * Skeleton-based loading state. Renders placeholder cards that mimic
 * the task card layout for better perceived performance.
 *
 * @param {Object} props
 * @param {number} [props.count=6] – number of skeleton cards
 * @param {string} [props.message='Loading…']
 */
export default function LoadingSpinner({ count = 6, message = 'Loading…' }) {
  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-slate-400 dark:text-slate-500 animate-pulse">
        {message}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 animate-pulse"
          >
            {/* Title skeleton */}
            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3" />
            {/* Description skeleton */}
            <div className="h-3 bg-slate-100 dark:bg-slate-700/60 rounded w-full mb-2" />
            <div className="h-3 bg-slate-100 dark:bg-slate-700/60 rounded w-5/6 mb-4" />
            {/* Badges skeleton */}
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-slate-100 dark:bg-slate-700/60 rounded-full" />
              <div className="h-6 w-16 bg-slate-100 dark:bg-slate-700/60 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
