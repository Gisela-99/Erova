import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bodyTypes } from "../../data/dataBody";
import { doc, setDoc, db } from "../../services/config";
import { getCurrentUserId } from "../../services/auth";
import './ProfileDetail.styles.css';

function ProfileDetail() {
  const navigate = useNavigate();
  const [genero, setGenero] = useState(null);
  const [tipoCuerpo, setTipoCuerpo] = useState(null);

  const guardarPerfil = async () => {
    const uid = await getCurrentUserId();

    if (!uid || !genero || !tipoCuerpo) {
      alert("Por favor selecciona el género y tipo de cuerpo.");
      return;
    }

    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        genero,
        tipoCuerpo: tipoCuerpo.tipo,
        medidasReferencia: {
          busto: tipoCuerpo.busto,
          cintura: tipoCuerpo.cintura,
          cadera: tipoCuerpo.cadera
        },
        updatedAt: new Date()
      }, { merge: true });
      navigate('/');
    } catch (error) {
      console.error("Error al guardar el tipo de cuerpo:", error);
      alert("Hubo un error al guardar el tipo de cuerpo.");
    }
  };

  return (
    <div>
      <h1>Perfil detallado: medidas, localización y tipo de cuerpo</h1>

      <form>
        <div className="group-input">
          <label htmlFor="genero">Género</label><br />

          <input
            type="radio"
            id="hombre"
            name="genero"
            value="hombre"
            onChange={(e) => {
              setGenero(e.target.value);
              setTipoCuerpo(null);
            }}
          />
          <label htmlFor="hombre">Hombre</label>

          <input
            type="radio"
            id="mujer"
            name="genero"
            value="mujer"
            onChange={(e) => {
              setGenero(e.target.value);
              setTipoCuerpo(null);
            }}
          />
          <label htmlFor="mujer">Mujer</label>
        </div>

        {/* Tipo de cuerpo */}
        {genero && (
          <div className="group-input">
            <label>Tipo de cuerpo ({genero})</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem"
              }}
            >
              {bodyTypes[genero].map((tipoObj) => (
                <div
                  key={tipoObj.tipo}
                  onClick={() => setTipoCuerpo(tipoObj)}
                  className={`body-type-item ${tipoCuerpo?.tipo === tipoObj.tipo ? 'selected' : ''}`}
                  style={{
                    padding: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                    userSelect: "none",
                    backgroundColor: tipoCuerpo?.tipo === tipoObj.tipo ? "#FBBF3D" : "#fff"
                  }}
                >
                  <strong>{tipoObj.tipo}</strong>
                  <div style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    <div>Busto: {tipoObj.busto[0]} - {tipoObj.busto[1]} cm</div>
                    <div>Cintura: {tipoObj.cintura[0]} - {tipoObj.cintura[1]} cm</div>
                    <div>Cadera: {tipoObj.cadera[0]} - {tipoObj.cadera[1]} cm</div>
                  </div>

                  {/* Añadir una imagen  */}
                  {/* <img src={tipoObj.imagen} alt={tipoObj.tipo} /> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      <div style={{ marginTop: "2rem" }}>
        <button type="button" onClick={() => navigate('/user-measurements')}>
          ¿No sabes qué tipo de cuerpo eres?
        </button>
        <br /><br />

        <button type="button" onClick={() => navigate(-1)}>Volver atrás</button>
        <button type="button" onClick={guardarPerfil}>Siguiente</button>
      </div>
    </div>
  );
}

export default ProfileDetail;

