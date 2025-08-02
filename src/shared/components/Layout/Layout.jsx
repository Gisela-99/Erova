import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Layout.styles.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <main className="main-content">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;