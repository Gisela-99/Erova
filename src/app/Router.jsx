// src/app/Router.jsx
import { Route, Routes } from 'react-router-dom';
// Importa todas tus páginas
import Home from '../pages/Home/Home';
// AQUÍ ESTÁ LA LÍNEA CRÍTICA Y CORREGIDA:
import Layout from '../shared/components/Layout'; 
import Preferences from '../pages/Preferences/Preferences';
import UserMeasurents from '../pages/UserMeasurements/UserMeasurements.jsx';
import BodyProfileSetup from '../pages/BodyProfileSetup/BodyProfileSetup';
import Error404 from '../pages/Error404/Error404';
import Asistente from '../pages/Asistente/Asistente.jsx';
import Armario from '../pages/Armario/Armario';
import Calendario from '../pages/Calendario/Calendario';
import Comunidad from '../pages/Comunidad/Comunidad';
import Perfil from '../pages/Perfil/Perfil';
import AgregarPrenda from '../pages/AgregarPrenda/AgregarPrenda';
import CrearOutfit from '../pages/CrearOutfit/CrearOutfit';
import Login from '../pages/Login';
import Splash from '../pages/Splash';


import ProtectedRoute from '../shared/components/ProtectedRoute/ProtectedRoute.jsx';
import ClasificarPrenda from '../pages/ClasificarPrendas/ClasificarPrendas.jsx';

const Router = () => {
  return (
    <Routes>

      {/* --- RUTAS PÚBLICAS --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/splash" element={<Splash />} />

      {/* --- RUTAS PROTEGIDAS --- */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="armario" element={<Armario />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="preferences" element={<Preferences />} />
  
        <Route path="body-profile" element={<BodyProfileSetup />} />
        <Route path="user-measurements" element={<UserMeasurents />} />
        
        <Route path="asistente" element={<Asistente />} />
        <Route path="agregar-prenda" element={<AgregarPrenda />} />
        <Route path="crear-outfit" element={<CrearOutfit />} />
        <Route path='clasificar-prenda' element={<ClasificarPrenda/>}></Route>
        <Route path="comunidad" element={<Comunidad />} />
      </Route>

      {/* --- RUTA CATCH-ALL --- */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;