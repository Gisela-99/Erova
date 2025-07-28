import { useNavigate } from 'react-router-dom'
import './Splash.style.css'


function Splash() {
  const navigate = useNavigate()
  return (
    <div>
      <div className='fondo'>
        <div className='logo'></div>
      </div>
      <div className='text-splash'>
        <h3>Slogan - ipsum dolor sit amet</h3>
        <p className='p-splash'>Worem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan.</p>
      </div>
      <button className='btn-splash' onClick={() => navigate('/login')}
      >Inicia Sesión</button>
      <p className='link-home'>Explora la app</p>
    </div>
  )
}


export default Splash