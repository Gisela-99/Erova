import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useUserContext } from '../../providers/UserProvider';
import {
  signUp,
  signIn,
  loginWithGoogle
} from '../../services/auth'
import './Login.styles.css'


const Login = () => {
  const { setUser } = useUserContext()
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)


  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    email: '',
    password: '',
    nickname: '',
  })
  const [error, setError] = useState('')


  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      setError('Por favor, rellena email y contraseña')
      return
    }
    setError('')


    try {
      const user = await signIn(formData.email, formData.password)
      setUser({ uid: user.uid, email: user.email })
      navigate('/preferences')
      // navigate('/profile-datail')
    } catch (err) {
      setError(err.message || 'error al inicio')
    }
  }




  const handleSignUp = async () => {
    if (!formData.email || !formData.password) {
      setError('Por favor, rellena email y contraseña')
      return
    }
    setError('')


    try {
      const userId = await signUp(formData)
      setUser({ uid: userId, email: formData.email })
      navigate('/preferences')
    } catch (err) {
      setError(err.message || 'Error al registro')
    }


  }


  const handleGoogleLogin = async () => {
    try {
      const { user, isNewUser } = await loginWithGoogle()
      setUser({ uid: user.uid, email: user.email })
      if (isNewUser) {
        console.log('Nuevo usuario:', user.displayName)
        navigate('/preferences')
        // navigate('/profile-datail')
      } else {
        navigate('/Error404')
        console.log('Hubo un error')
      }
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión con Google')
    }
  }




  return (
    <div>
      <div className='container-login'>


        <div className='fondo-image'>
          <div className='toggle-button-wrapper'>
            <div className={`toggle-button ${isRegistering ? 'register' : 'login'}`}>
              <div className='slider'></div>
              <button
                className={!isRegistering ? 'active' : ''}
                onClick={() => setIsRegistering(false)}> Entrar</button>
              <button
                className={!isRegistering ? 'active' : ''}
                onClick={() => setIsRegistering(true)}>Registrarse</button>
            </div>
          </div>
          {isRegistering ? (
            <>
              <div className='fondo-registro'>
                <div className={`input-group animate-slide-in-up`} style={{ animationDelay: '0.1s' }}>
                  <input
                    type='text'
                    placeholder=''
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <label>Nombre de usuario</label>
                </div>
                <div className={`input-group animate-slide-in-up`} style={{ animationDelay: '0.3s' }}>
                  <input
                    type='text'
                    placeholder=''
                    value={formData.nickname}
                    onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                    required
                  />
                  <label>Nickname</label>
                </div>
                <div className={`input-group animate-slide-in-up`} style={{ animationDelay: '0.5s' }}>
                  <input
                    type='date'
                    placeholder=''
                    value={formData.birthdate}
                    onChange={e => setFormData({ ...formData, birthdate: e.target.value })}
                    required
                  />
                  {/* <label>DD/MM/YYYY</label> */}
                </div>
                <div className="input-group">
                  <input
                    type='email'
                    placeholder=''
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <label>Introduce tu correo</label>
                </div>
                <div className="input-group">
                  <input
                    type='password'
                    placeholder=''
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <label>Introduce tu contraseña</label>
                </div>
                {error && <div> {error} </div>}
                <div className='container-btn'>
                  <button className="btn-descubreEstilo" onClick={handleSignUp}>¡Descubre tu estilo!</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className='fondo-login'>
                <div className="input-group">
                  <input
                    type='text'
                    placeholder=''
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <label>Introduce tu correo</label>
                </div>
                <div className="input-group">
                  <input
                    type='password'
                    placeholder=''
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <label>Introduce tu contraseña</label>
                </div>
                {error && <div> {error} </div>}
                <div className='container-btn'>
                  <button className="btn-descubreEstilo" onClick={handleSignIn}>¡Descubre tu estilo!</button>
                </div>
              </div>
            </>
          )}
        </div>


        <div className='container-redes'>
          <p>o entra con</p>
          <button className='btn-redesSociales' onClick={handleGoogleLogin}> <FcGoogle size={33} /> </button>
        </div>


      </div>
    </div>
  );
}


export default Login;
