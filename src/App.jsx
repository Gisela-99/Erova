// src/App.jsx

import Router from './app/Router';

/**
 * Componente principal de la aplicación.
 * Su única responsabilidad es renderizar el sistema de rutas.
 * La lógica de autenticación y el estado del usuario son manejados
 * por UserProvider y ProtectedRoute.
 */
const App = () => {
  return <Router />;
};

export default App;