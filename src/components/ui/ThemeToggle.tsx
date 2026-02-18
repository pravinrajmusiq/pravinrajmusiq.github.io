import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className="fixed top-8 right-6 md:right-8 z-20 p-2 rounded-full border border-[var(--border-color)] bg-[var(--page-bg)] text-[var(--text-primary)] hover:opacity-80 transition-opacity touch-action-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" aria-hidden />
      ) : (
        <Moon className="w-5 h-5" aria-hidden />
      )}
    </motion.button>
  );
}
