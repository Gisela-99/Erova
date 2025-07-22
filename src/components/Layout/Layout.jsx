import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
  return (
    <div>
      <nav>

      </nav>
      <main>{children}</main>
    </div>
  )
}

export default Layout;