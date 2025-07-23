import { useState } from 'react';
import { useUserContext } from '../../providers/UserProvider';
import {
  signUp,
  signIn
} from '../../services/auth'

const Login = () => {
  const { setUser } = useUserContext()
  const [isRegistering, setIsRegistering] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    age: '',
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
    } catch (err) {
      setError(err.message || 'Error al registro')
    }

  }


  return (
    <div>
      <div>

        <h1> {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h1>

        {isRegistering ? (
          <>
            <div>
              <input
                type='text'
                placeholder=''
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <label>Nombre</label>
            </div>

            <div>
              <input
                type='text'
                placeholder=''
                value={formData.nickname}
                onChange={e => setFormData({ ...formData, nickname: e.target.value })}
                required
              />
              <label>Nickname</label>
            </div>
            <div>
              <input
                type='number'
                placeholder=''
                value={formData.age}
                onChange={e => setFormData({ ...formData, age: e.target.value })}
                required
              />
              <label>Edad</label>
            </div>
            <div>
              <input
                type='email'
                placeholder=''
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label>Email</label>
            </div>
            <div>
              <input
                type='password'
                placeholder=''
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <label>Contraseña</label>
            </div>
          </>
        ) : (
          <>
            <div>
              <input
                type='email'
                placeholder=''
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label>Email</label>
            </div>
            <div>
              <input
                type='password'
                placeholder=''
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <label>Contraseña</label>
            </div>
          </>
        )}


        {error && <div> {error} </div>}

        {isRegistering ? (<button onClick={handleSignUp}>Registrarse</button>) : <button onClick={handleSignIn}>Iniciar Sesión</button>}


        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
        >
          {isRegistering
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate'}
        </button>



      </div>
    </div>
  );
}

export default Login;