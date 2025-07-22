import { useState } from 'react';
//import { useUserContext } from '../../providers/UserProvider';

const Login = () => {
  //const { setUser } = useUserContext();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    nickname: '',
  })



  return (
    <div>
      <div>

        <h1>Iniciar Sesión</h1>
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

        <button>Iniciar Sesión</button>
        <button>Registrarse</button>
      </div>
    </div>
  );
}

export default Login;