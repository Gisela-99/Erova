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
    case 'auth/network-request-failed': return 'Error de red. Por favor, revisa tu conexión.';

    // --- INICIO DE LOS CAMBIOS ---
    case 'auth/profile-creation-failed':
      return 'El nombre de usuario o nickname ya está en uso. Por favor, elige otro.';
    case 'auth/cleanup-failed':
      return 'Error crítico del servidor. Por favor, contacta a soporte.';
    // --- FIN DE LOS CAMBIOS ---
    
    default:
      return `Error inesperado. Por favor, inténtalo de nuevo.`;
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
    passwordConfirm: '',
    nickname: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
  const newErrors = {};

  // Validación de Nombre
  if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
  
  // Validación de Nickname
  if (!formData.nickname) newErrors.nickname = 'El nickname es obligatorio.';

  // Validación de Email
  if (!formData.email) {
    newErrors.email = 'El correo es obligatorio.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'El formato del correo no es válido.';
  }

  // Validación de Contraseña
  if (!formData.password) {
    newErrors.password = 'La contraseña es obligatoria.';
  } else if (formData.password.length < 8) {
    newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
    newErrors.password = 'Debe contener mayúscula, minúscula y un número.';
  }
  
  // Validación de Confirmación de Contraseña
  if (formData.password !== formData.passwordConfirm) {
    newErrors.passwordConfirm = 'Las contraseñas no coinciden.';
  }
  
  return newErrors;
};


  // src/pages/Login/hooks/useAuthForm.js

const handleSignIn = async () => {
  // Usamos 'setErrors' y guardamos el error en la clave 'form'
  if (!formData.email || !formData.password) {
    setErrors({ form: 'Por favor, rellena email y contraseña' });
    return;
  }
  setErrors({}); // Limpiamos errores

  const result = await signIn(formData.email, formData.password);

  if (result.success) {
    setUser({ uid: result.userId, email: formData.email });
    navigate('/body-profile');
  } else {
    // Usamos 'setErrors' y guardamos el error en la clave 'form'
    setErrors({ form: getAuthErrorMessage(result.error) });
  }
};


  const handleSignUp = async () => {
  // 1. Validamos los datos del formulario primero.
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return; // Detenemos si hay errores de validación.
  }

  setErrors({}); // Limpiamos cualquier error anterior si la validación es exitosa.

  // 2. Si la validación pasa, llamamos al servicio de registro.
  const result = await signUp(formData);

  if (result.success) {
    setUser({ uid: result.userId, email: formData.email });
    navigate('/body-profile');
  } else {
    // 3. Si el servidor devuelve un error (ej: email duplicado), lo mostramos.
    const serverError = getAuthErrorMessage(result.error);
    setErrors({ form: serverError }); // Asignamos el error a una clave 'form' para mostrarlo de forma general.
  }
};

  const handleGoogleLogin = async () => {
  try {
    setErrors({}); // Limpiamos errores
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
      // Usamos 'setErrors' y guardamos el error en la clave 'form'
      setErrors({ form: getAuthErrorMessage(result.error) });
    }
  } catch (err) {
    // Usamos 'setErrors' y guardamos el error en la clave 'form'
    setErrors({ form: getAuthErrorMessage(err.code) });
  }
};

  return {
    formData,
    setFormData,
    errors,
    handleSignIn,
    handleSignUp,
    handleGoogleLogin,
  };
};
