import Router from './app/Router';
import Login from './pages/Login';

import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <Router user={user} />
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
};

export default App;