import Navbar from './Navbar';
import { NotificationProvider } from '../../hooks/useNotification';

/**
 * Root layout wrapper. Includes the NotificationProvider so toasts
 * can be triggered from anywhere inside the layout.
 */
export default function AppLayout({ children }) {
  return (
    <NotificationProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
        <Navbar />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500">
          {children}
        </main>
      </div>
    </NotificationProvider>
  );
}
