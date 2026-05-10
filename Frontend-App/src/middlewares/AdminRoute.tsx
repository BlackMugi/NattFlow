import { Navigate, Outlet } from 'react-router-dom';
import { getUserRole } from '../services/authService';

export const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const role  = getUserRole();

  if (!token)           return <Navigate to="/login" replace />;
  if (role !== 'ADMIN') return <Navigate to="/" replace />;

  return <Outlet />;
};