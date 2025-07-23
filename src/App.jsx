import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from './services/config'
import Router from './app/Router';
import Login from './pages/Login';




const App = () => {
  const [user, setUser] = useState(null);
  //const { user, setUser } = useUserContext()
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      console.log('Usuariooooooooooooooo')
      if (user) {
        console.log('Usuario ha entrado')
        setUser(user)
      } else {
        console.log('No logueado')
        setUser(null)
      }
    })
  }, [setUser])

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