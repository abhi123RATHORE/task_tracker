import { Link, useLocation } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext';
import { Button, IconButton, Tooltip } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

export default function Navbar() {
  const { mode, toggleTheme } = useThemeMode();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: DashboardRoundedIcon },
    { label: 'Summary', path: '/summary', icon: BarChartRoundedIcon },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2 rounded-xl text-white shadow-md shadow-indigo-500/25 group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-shadow duration-200">
              <CheckBoxRoundedIcon fontSize="small" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-slate-100">
              Task<span className="text-indigo-600 dark:text-indigo-400">Tracker</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path} className="no-underline">
                  <Button
                    variant={isActive ? 'contained' : 'text'}
                    color={isActive ? 'primary' : 'inherit'}
                    disableElevation
                    startIcon={<Icon />}
                    sx={{
                      borderRadius: 2.5,
                      px: 2.5,
                      py: 0.8,
                      color: isActive ? 'white' : 'text.secondary',
                      fontWeight: isActive ? 600 : 500,
                      ...(isActive && {
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
                      }),
                      '&:hover': {
                        backgroundColor: isActive
                          ? undefined
                          : 'rgba(99, 102, 241, 0.08)',
                        ...(isActive && {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                        }),
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton
                onClick={toggleTheme}
                color="inherit"
                size="small"
                sx={{
                  bgcolor: mode === 'dark' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(100, 116, 139, 0.08)',
                  '&:hover': {
                    bgcolor: mode === 'dark' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(100, 116, 139, 0.15)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {mode === 'dark' ? (
                  <LightModeRoundedIcon className="text-amber-400" />
                ) : (
                  <DarkModeRoundedIcon className="text-slate-600" />
                )}
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
