// src/pages/Login/components/RegisterForm.jsx
import Input from '../../../shared/components/Inputs/Input'; 

const RegisterForm = ({ formData, setFormData, onSignUp, error }) => (
  <div className='fondo-registro'>
    <Input
      label="Nombre de usuario"
      name="name"
      value={formData.name}
      onChange={e => setFormData({ ...formData, name: e.target.value })}
      style={{ animationDelay: '0.1s' }}
    />
    <Input
      label="Nickname"
      name="nickname"
      value={formData.nickname}
      onChange={e => setFormData({ ...formData, nickname: e.target.value })}
      style={{ animationDelay: '0.3s' }}
    />
    <Input
      label="DD/MM/YYYY"
      type="date"
      name="birthdate"
      value={formData.birthdate}
      onChange={e => setFormData({ ...formData, birthdate: e.target.value })}
      style={{ animationDelay: '0.5s' }}
    />
    <Input
      label="Introduce tu correo"
      type="email"
      name="email"
      value={formData.email}
      onChange={e => setFormData({ ...formData, email: e.target.value })}
    />
    <Input
      label="Introduce tu contraseña"
      type="password"
      name="password"
      value={formData.password}
      onChange={e => setFormData({ ...formData, password: e.target.value })}
    />
    
    <div className='container-btn'>
      <button className="btn-descubreEstilo" onClick={onSignUp}>¡Descubre tu estilo!</button>
    </div>
    {error && <div className="error-message">{error}</div>}
  </div>
);

export default RegisterForm;