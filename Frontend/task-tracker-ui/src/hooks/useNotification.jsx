import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext();

/**
 * Provider that renders a Snackbar + Alert for toast notifications.
 * Wrap the app with this to use `useNotification()` anywhere.
 */
export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success', // 'success' | 'error' | 'warning' | 'info'
  });

  const notify = useCallback((message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  }, []);

  const handleClose = useCallback((_, reason) => {
    if (reason === 'clickaway') return;
    setNotification((prev) => ({ ...prev, open: false }));
  }, []);

  const value = useMemo(
    () => ({
      success: (msg) => notify(msg, 'success'),
      error: (msg) => notify(msg, 'error'),
      warning: (msg) => notify(msg, 'warning'),
      info: (msg) => notify(msg, 'info'),
    }),
    [notify],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          variant="filled"
          sx={{ width: '100%', borderRadius: 2, fontWeight: 500 }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

/**
 * Hook to trigger toast notifications.
 * @returns {{ success: (msg: string) => void, error: (msg: string) => void, warning: (msg: string) => void, info: (msg: string) => void }}
 */
export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}
