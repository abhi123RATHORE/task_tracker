import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useThemeMode } from '../../context/ThemeContext';

export default function SummaryChart({ data }) {
  const { mode } = useThemeMode();
  
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-500">
        No data available for chart.
      </div>
    );
  }

  // Format data for Recharts
  const chartData = data.map(item => ({
    name: item.taskTitle.length > 20 ? item.taskTitle.substring(0, 20) + '...' : item.taskTitle,
    minutes: item.totalMinutes,
    hours: (item.totalMinutes / 60).toFixed(1),
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-3 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">{label}</p>
          <p className="text-indigo-600 dark:text-indigo-400">
            {payload[0].payload.hours} Hours ({payload[0].value} min)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false}
            stroke={mode === 'dark' ? '#334155' : '#e2e8f0'} 
          />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end"
            height={60}
            tick={{ fill: mode === 'dark' ? '#94a3b8' : '#64748b', fontSize: 12 }}
            tickMargin={10}
            axisLine={{ stroke: mode === 'dark' ? '#475569' : '#cbd5e1' }}
          />
          <YAxis 
            label={{ 
              value: 'Minutes Logged', 
              angle: -90, 
              position: 'insideLeft',
              style: { fill: mode === 'dark' ? '#94a3b8' : '#64748b' }
            }}
            tick={{ fill: mode === 'dark' ? '#94a3b8' : '#64748b' }}
            axisLine={{ stroke: mode === 'dark' ? '#475569' : '#cbd5e1' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="minutes" 
            radius={[4, 4, 0, 0]}
            maxBarSize={60}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={mode === 'dark' ? '#818cf8' : '#6366f1'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
