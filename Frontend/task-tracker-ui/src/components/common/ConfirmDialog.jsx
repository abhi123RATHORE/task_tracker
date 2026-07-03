import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

/**
 * Generic confirmation dialog. Fully configurable — not tied to "delete" only.
 *
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} props.onConfirm
 * @param {string}  [props.title='Confirm Action']
 * @param {string}  [props.message='Are you sure you want to proceed?']
 * @param {string}  [props.confirmText='Confirm']
 * @param {string}  [props.cancelText='Cancel']
 * @param {'error'|'primary'|'warning'} [props.confirmColor='error']
 * @param {boolean} [props.loading=false]
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'error',
  loading = false,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="font-semibold">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions className="px-6 pb-4">
        <Button onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          color={confirmColor}
          variant="contained"
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? 'Processing…' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
