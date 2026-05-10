import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

export function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-16 ">
        <Outlet />
      </main>
    </>
  );
}