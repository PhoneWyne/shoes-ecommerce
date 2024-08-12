import { Outlet } from 'react-router-dom';
import { Navbar } from './Backup_Navbar';
import { Footer } from './Backup_Footer';

export function Layout() {
  return (
    <div className='bg-primary text-white min-h-screen'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
