import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Layout from '../components/Layout/Layout';
import Preferences from '../pages/Preferences/Preferences';
import ProfileDetail from '../pages/ProfileDetail/ProfileDetail';
import Error404 from '../pages/Error404/Error404';
import Armario from '../pages/Armario/Armario';
import Calendario from '../pages/Calendario/Calendario';
import Perfil from '../pages/Perfil/Perfil';
import AgregarPrenda from '../pages/AgregarPrenda/AgregarPrenda';
import CrearOutfit from '../pages/CrearOutfit/CrearOutfit';

// Router receives user prop from App.jsx
const Router = ({ user }) => {
  // If user is not available, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="armario" element={<Armario />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="profile" element={<ProfileDetail />} />
        <Route path="agregar-prenda" element={<AgregarPrenda />} />
        <Route path="crear-outfit" element={<CrearOutfit />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default Router;