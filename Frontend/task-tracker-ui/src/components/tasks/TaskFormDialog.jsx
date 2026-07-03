import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  IconButton,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { PRIORITY_LABELS, VALIDATION } from '../../constants';

const DEFAULT_STATE = {
  title: '',
  description: '',
  priorityEnum: 'LOW',
};

export default function TaskFormDialog({
  open,
  mode = 'create', // 'create' | 'edit'
  initialData = null,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState(DEFAULT_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync initial data when modal opens
  useEffect(() => {
    if (open) {
      setFormData(initialData || DEFAULT_STATE);
      setErrors({});
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error on typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < VALIDATION.TITLE_MIN_LENGTH) {
      newErrors.title = `Title must be at least ${VALIDATION.TITLE_MIN_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      // API errors are typically handled globally or by the parent hook,
      // but we can catch them here if needed.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <span className="font-bold text-xl">
          {mode === 'create' ? 'Create New Task' : 'Edit Task'}
        </span>
        <IconButton onClick={onClose} size="small" disabled={isSubmitting}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent className="pt-6">
          <Stack spacing={3}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
              autoFocus
              disabled={isSubmitting}
            />

            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              disabled={isSubmitting}
              placeholder="Add details about this task..."
            />

            <TextField
              select
              label="Priority"
              name="priorityEnum"
              value={formData.priorityEnum}
              onChange={handleChange}
              fullWidth
              disabled={isSubmitting}
            >
              {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
