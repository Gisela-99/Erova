// src/pages/Login/Login.jsx
import { useState } from 'react';
import { useAuthForm } from './hooks/useAuthForm';
import { FcGoogle } from "react-icons/fc";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './Login.styles.css'

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const {
    formData,
    setFormData,
    errors, 
    handleSignIn,
    handleSignUp,
    handleGoogleLogin 
  } = useAuthForm();

  return (
    <div>
      <div className='container-login'>
        <div className='fondo-image'>

          {/*  BOTÓN TOGGLE */}
          <div className='toggle-button-wrapper'>
            <div className={`toggle-button ${isRegistering ? 'register' : 'login'}`}>
              <div className='slider-login-registro'></div>
              <button
                className={!isRegistering ? 'active' : ''}
                onClick={() => setIsRegistering(false)}> 
                Entrar
              </button>
              <button
                className={isRegistering ? 'active' : ''}
                onClick={() => setIsRegistering(true)}> 
                Registrarse
              </button>
            </div>
          </div>

          {/*  LOS COMPONENTES DE FORMULARIO */}
          {isRegistering ? (
            <RegisterForm
              formData={formData}
              setFormData={setFormData}
              onSignUp={handleSignUp}
              errors={errors} // <-- CAMBIO 2: Se pasa el objeto 'errors'
            />
          ) : (
            <LoginForm
              formData={formData}
              setFormData={setFormData}
              onSignIn={handleSignIn}
              error={errors.form} // <-- CAMBIO 3: Le pasamos solo el error general al login
            />
          )}
        </div>

        {/*  CONTENEDOR DE LOGIN CON GOOGLE */}
        <div className='container-redes'>
          <p>o entra con</p>
          <button className='btn-redesSociales' onClick={handleGoogleLogin}> 
            <FcGoogle size={33} />
          </button>
          {/* Mostramos el error general aquí también para el login con google */}
          {errors.form && !isRegistering && <div className="error-message">{errors.form}</div>}
        </div>

      </div>
    </div>
  );
}

export default Login;