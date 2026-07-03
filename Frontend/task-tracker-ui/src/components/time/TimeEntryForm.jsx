import { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { VALIDATION } from '../../constants';
import { useNotification } from '../../hooks/useNotification';

export default function TimeEntryForm({ taskId, onSubmit }) {
  const notify = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    durationMinutes: '',
    note: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const minutes = parseInt(formData.durationMinutes, 10);
    
    // Client-side validation matching backend rules
    if (isNaN(minutes) || minutes < VALIDATION.TIME_ENTRY_MIN_MINUTES) {
      notify.warning('Duration must be greater than 0 minutes');
      return;
    }
    
    if (minutes > VALIDATION.TIME_ENTRY_MAX_MINUTES) {
      notify.warning(`Duration cannot exceed ${VALIDATION.TIME_ENTRY_MAX_MINUTES} minutes (8 hours)`);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        durationMinutes: minutes,
        note: formData.note.trim(),
      });
      // Reset on success
      setFormData({ durationMinutes: '', note: '' });
    } catch (err) {
      // Error handled by parent
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <TextField
          label="Minutes"
          name="durationMinutes"
          type="number"
          value={formData.durationMinutes}
          onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
          required
          disabled={isSubmitting}
          size="small"
          inputProps={{
            min: VALIDATION.TIME_ENTRY_MIN_MINUTES,
            max: VALIDATION.TIME_ENTRY_MAX_MINUTES,
          }}
          sx={{ width: { xs: '100%', sm: '140px' } }}
        />
        
        <TextField
          label="Note (Optional)"
          name="note"
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          disabled={isSubmitting}
          size="small"
          fullWidth
          placeholder="What did you work on?"
        />
      </div>
      
      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting || !formData.durationMinutes}
        startIcon={isSubmitting ? <CircularProgress size={16} /> : <AddRoundedIcon />}
        fullWidth
        sx={{
          height: '42px',
          borderRadius: 2.5,
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          },
          '&:disabled': {
            background: undefined,
          },
        }}
      >
        Log Time
      </Button>
    </form>
  );
}
