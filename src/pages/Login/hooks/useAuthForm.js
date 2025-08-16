// // src/pages/Login/hooks/useAuthForm.js
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useUserContext } from '../../../providers/UserProvider';
// import { signUp, signIn, loginWithGoogle } from '../../../services/auth.service';


// // 1. Helper arreglado: Descomentamos el switch y lo dejamos como una función pura.
// const getAuthErrorMessage = (code) => {
//   switch (code) {
//     case 'auth/user-not-found': return 'Usuario no registrado. Por favor, regístrate.';
//     case 'auth/wrong-password': return 'Contraseña incorrecta.';
//     case 'auth/invalid-email': return 'Correo electrónico no válido.';
//     case 'auth/email-already-in-use': return 'Este correo ya está en uso.';
//     case 'auth/weak-password': return 'La contraseña es demasiado débil.';
//     default: return `Error inesperado: ${code}`;
//   }
// };

// export const useAuthForm = () => {
//   const { setUser } = useUserContext();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: '',
//     birthdate: '',
//     email: '',
//     password: '',
//     nickname: '',
//   });
//   const [error, setError] = useState('');

//   const handleSignIn = async () => {
//     if (!formData.email || !formData.password) {
//       setError('Por favor, rellena email y contraseña');
//       return;
//     }
//     setError('');

//     try {
//       const userId = await signIn(formData.email, formData.password);

//       // 3. Usamos la función helper aquí para limpiar el código.
//       if (typeof userId === 'string' && userId.startsWith('auth/')) {
//         setError(getAuthErrorMessage(userId));
//         return;
//       }

//       setUser({ uid: userId, email: formData.email });
//       navigate('/body-profile');
//     } catch (err) {
//       setError(err.message || 'Error al iniciar sesión');
//     }
//   };

//   const handleSignUp = async () => {
//     if (!formData.email || !formData.password) {
//       setError('Por favor, rellena email y contraseña');
//       return;
//     }
//     setError('');

//     try {
//       const userId = await signUp(formData);

//       // 3. Y la usamos aquí también.
//       if (typeof userId === 'string' && userId.startsWith('auth/')) {
//         setError(getAuthErrorMessage(userId));
//         return;
//       }

//       setUser({ uid: userId, email: formData.email });
//       navigate('/body-profile');
//     } catch (err) {
//       setError(err.message || 'Error al registro');
//     }
//   };

// const handleGoogleLogin = async () => {
//   try {
//     setError(''); // Limpia errores anteriores
//     const result = await loginWithGoogle();

//     if (result.success) {
//       // Ahora `result` tiene el objeto `user` y el flag `isNewUser`
//       const { user, isNewUser } = result;
      
//       // El contexto de usuario recibe la información completa
//       setUser({ uid: user.uid, email: user.email });

//       // La navegación es dinámica: si es nuevo, va al perfil, si no, a la home.
//       if (isNewUser) {
//         navigate('/body-profile');
//       } else {
//         navigate('/');
//       }
//     } else {
//       // Si el servicio devuelve un error, lo mostramos
//       setError(getAuthErrorMessage(result.error));
//     }
//   } catch (err) {
//     setError(err.message || 'Error inesperado al iniciar sesión con Google');
//   }
// };
//    return {
//      formData,
//      setFormData,
//      error,
//      handleSignIn,    
//      handleSignUp,
//      handleGoogleLogin,
//    };
  
// };


// src/pages/Login/hooks/useAuthForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../providers/UserProvider';
import { signUp, signIn, loginWithGoogle } from '../../../services/auth.service';

const getAuthErrorMessage = (code) => {
  switch (code) {
    case 'auth/user-not-found': return 'Usuario no registrado. Por favor, regístrate.';
    case 'auth/wrong-password': return 'Contraseña incorrecta.';
    case 'auth/invalid-email': return 'Correo electrónico no válido.';
    case 'auth/email-already-in-use': return 'Este correo ya está en uso.';
    case 'auth/weak-password': return 'La contraseña es demasiado débil.';
    // Añado un caso para errores de red o servidor, que es común.
    case 'auth/network-request-failed': return 'Error de red. Por favor, revisa tu conexión.';
    default: return `Error inesperado. Por favor, inténtalo de nuevo.`;
  }
};

export const useAuthForm = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    email: '',
    password: '',
    nickname: '',
  });
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setError('Por favor, rellena email y contraseña');
      return;
    }
    setError('');

    try {
      const userId = await signIn(formData.email, formData.password);
      setUser({ uid: userId, email: formData.email });
      navigate('/body-profile');
    } catch (err) {
      // **CORRECCIÓN AQUÍ**
      // Usamos err.code para obtener el mensaje de error personalizado.
      setError(getAuthErrorMessage(err.code));
    }
  };

  const handleSignUp = async () => {
    if (!formData.email || !formData.password) {
      setError('Por favor, rellena email y contraseña');
      return;
    }
    setError('');

    try {
      const userId = await signUp(formData);
      setUser({ uid: userId, email: formData.email });
      navigate('/body-profile');
    } catch (err) {
      // **Y CORRECCIÓN AQUÍ**
      // Hacemos lo mismo para el registro.
      setError(getAuthErrorMessage(err.code));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      const result = await loginWithGoogle();

      if (result.success) {
        const { user, isNewUser } = result;
        setUser({ uid: user.uid, email: user.email });
        if (isNewUser) {
          navigate('/body-profile');
        } else {
          navigate('/');
        }
      } else {
        // Esta parte ya estaba bien, asumiendo que loginWithGoogle devuelve { success: false, error: '...' }
        setError(getAuthErrorMessage(result.error));
      }
    } catch (err) {
      // **Y TAMBIÉN AQUÍ**
      // Por si loginWithGoogle también lanza una excepción.
      setError(getAuthErrorMessage(err.code));
    }
  };

  return {
    formData,
    setFormData,
    error,
    handleSignIn,
    handleSignUp,
    handleGoogleLogin,
  };
};