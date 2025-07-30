import { logout } from "../../services/auth";

const Home = () => {
  const handleLogout = async () => {
    try {
      await logout()
      // setUserId(null)

    } catch (error) {
      console.log('Error al cerrar sesión', error)
    }
  }

  return (
    <div>
      <h1>Armario Digital</h1>
      <div>
        <input type="file" />
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </div>
  )

}

export default Home;