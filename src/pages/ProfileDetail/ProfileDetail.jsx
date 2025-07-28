import { useNavigate } from "react-router-dom"

function ProfileDeatil() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Perfil detallado : medidas, localización y tipo de cuerpo</h1>
      <button onClick={() => navigate(-1)}>Volver atrás</button>
      <button onClick={() => navigate('/')}> Siguiente</button>
    </div>
  )
}

export default ProfileDeatil
