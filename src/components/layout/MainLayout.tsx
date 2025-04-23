import { Outlet } from '@tanstack/react-router';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <Outlet />
    </div>
  );
}; 