import { Outlet } from 'react-router';
import { ThemeProvider } from '@/lib/ThemeContext';

export default function Root() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}
