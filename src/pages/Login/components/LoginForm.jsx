// src/pages/Login/components/LoginForm.jsx
import Input from '../../../shared/components/Inputs/Input'; 

const LoginForm = ({ formData, setFormData, onSignIn, error }) => (
  <div className='fondo-login'>
    <div className='logo-app'></div>
    
    <Input
      label="Introduce tu correo"
      type="email"
      value={formData.email}
      onChange={e => setFormData({ ...formData, email: e.target.value })}
    />
    
    <Input
      label="Introduce tu contraseña"
      type="password"
      value={formData.password}
      onChange={e => setFormData({ ...formData, password: e.target.value })}
    />

    <div className='container-btn'>
      <button className="btn-descubreEstilo" onClick={onSignIn}>¡Descubre tu estilo!</button>
    </div>
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default LoginForm;