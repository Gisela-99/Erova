// src/pages/Login/components/RegisterForm.jsx
import Input from '../../../shared/components/Inputs/Input';

// Fíjate que ahora recibe 'errors' (un objeto) en lugar de 'error'
const RegisterForm = ({ formData, setFormData, onSignUp, errors }) => (
  <div className='fondo-registro'>
    {/* Aquí mostramos el error general que viene del servidor (ej: email duplicado) */}
    {errors.form && <div className="error-message general-error">{errors.form}</div>}
    
    <Input
      label="Nombre de usuario"
      name="name"
      value={formData.name}
      onChange={e => setFormData({ ...formData, name: e.target.value })}
    />
    {/* Muestra el error solo si existe para el campo 'name' */}
    {errors.name && <p className="error-text">{errors.name}</p>}

    <Input
      label="Nickname"
      name="nickname"
      value={formData.nickname}
      onChange={e => setFormData({ ...formData, nickname: e.target.value })}
    />
    {errors.nickname && <p className="error-text">{errors.nickname}</p>}

    <Input
      label="DD/MM/YYYY"
      type="date"
      name="birthdate"
      value={formData.birthdate}
      onChange={e => setFormData({ ...formData, birthdate: e.target.value })}
    />

    <Input
      label="Introduce tu correo"
      type="email"
      name="email"
      value={formData.email}
      onChange={e => setFormData({ ...formData, email: e.target.value })}
    />
    {errors.email && <p className="error-text">{errors.email}</p>}

    <Input
      label="Introduce tu contraseña"
      type="password"
      name="password"
      value={formData.password}
      onChange={e => setFormData({ ...formData, password: e.target.value })}
    />
    {errors.password && <p className="error-text">{errors.password}</p>}
    
    {/* --- CAMPO AÑADIDO --- */}
    <Input
      label="Confirma tu contraseña"
      type="password"
      name="passwordConfirm"
      value={formData.passwordConfirm}
      onChange={e => setFormData({ ...formData, passwordConfirm: e.target.value })}
    />
    {errors.passwordConfirm && <p className="error-text">{errors.passwordConfirm}</p>}
    
    <div className='container-btn'>
      <button className="btn-descubreEstilo" onClick={onSignUp}>¡Descubre tu estilo!</button>
    </div>
  </div>
);

export default RegisterForm;