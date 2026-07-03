import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { formatDuration } from '../time/TimeEntryList';

export default function SummaryTable({ data }) {
  if (!data || data.length === 0) return null;

  const grandTotalMinutes = data.reduce((sum, item) => sum + item.totalMinutes, 0);

  // Sort by most time logged descending
  const sortedData = [...data].sort((a, b) => b.totalMinutes - a.totalMinutes);

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Table sx={{ minWidth: 500 }}>
        <TableHead sx={{ bgcolor: 'action.hover' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Task Title</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Total Minutes</TableCell>
            <TableCell align="right" sx={{ fontWeight: 600 }}>Formatted Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow
              key={row.taskId}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': { bgcolor: 'action.hover' },
                transition: 'background-color 0.15s ease',
              }}
            >
              <TableCell component="th" scope="row" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {index + 1}
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>{row.taskTitle}</TableCell>
              <TableCell align="right" sx={{ color: 'text.secondary' }}>{row.totalMinutes}m</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, color: 'primary.main' }}>
                {formatDuration(row.totalMinutes)}
              </TableCell>
            </TableRow>
          ))}
          {/* Grand Total Row */}
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell colSpan={2} sx={{ fontWeight: 700, textAlign: 'right' }}>
              Grand Total:
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>
              {grandTotalMinutes}m
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.1rem' }}>
              {formatDuration(grandTotalMinutes)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
