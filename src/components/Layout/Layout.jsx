import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  const location = useLocation();

  const showNavBar = location.pathname === '/';
  return (
    <div>
      <main>{children}</main>
      {showNavBar && <Navbar />}
    </div>
  )
}

export default Layout;