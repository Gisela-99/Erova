// import { useEffect, useState } from 'react';
// import { auth, onAuthStateChanged } from './services/config'
// import Router from './app/Router';
// import Login from './pages/Login';




// const App = () => {
//   const [user, setUser] = useState(null);
//   //const { user, setUser } = useUserContext()
//   useEffect(() => {
//     onAuthStateChanged(auth, user => {
//       console.log('Usuariooooooooooooooo')
//       if (user) {
//         console.log('Usuario ha entrado')
//         setUser(user)
//       } else {
//         console.log('No logueado')
//         setUser(null)
//       }
//     })
//   }, [setUser])

//   return (
//     <>
//       {user ? (
//         <Router user={user} />

//       ) : (
//         <Login setUser={setUser} />

//       )}
//     </>
//   );
// };

// export default App;

import { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from './services/config';
import { Routes, Route } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Router from './app/Router';


const App = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);


  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
        </>
      ) : (
        // rutas protegidas si el usuario está logueado
        <Route path="/*" element={<Router user={user} />} />
      )}
    </Routes>
  );
};


export default App;
