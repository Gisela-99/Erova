import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bodyTypes } from "../../data/dataBody";
import './ProfileDetail.styles.css';

function ProfileDetail() {
  const navigate = useNavigate();
  const [genero, setGenero] = useState(null);

  return (
    <div>
      <h1>Perfil detallado: medidas, localización y tipo de cuerpo</h1>
      <form>
        <div className='group-input'>
          <label htmlFor="genero">Género</label><br />
          <input type="radio" id="hombre" name="genero" value="hombre" onChange={(e) => setGenero(e.target.value)} />
          <label htmlFor="hombre">Hombre</label>

          <input type="radio" id="mujer" name="genero" value="mujer" onChange={(e) => setGenero(e.target.value)} />
          <label htmlFor="mujer">Mujer</label>
        </div>

        <div className='group-input'>
          <label>Tipo de cuerpo
            {genero ? ` (${genero})` : ''}
          </label>
          {genero && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {bodyTypes[genero].map(({ tipo }) => (
                <div
                  key={tipo}
                  onClick={() => console.log(`Seleccionado: ${tipo}`)}
                  className='body-type-item'
                  style={{
                    padding: '1rem',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  {tipo}
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      <div>
        <button onClick={() => navigate('/user-measurements')}>¿No sabes qué tipo de cuerpo eres?</button>
      </div>

      <button type="button" onClick={() => navigate(-1)}>Volver atrás</button>
      <button type="button" onClick={() => navigate('/')}>Siguiente</button>
    </div>
  );
}

export default ProfileDetail;
