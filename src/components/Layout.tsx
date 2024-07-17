import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

// rafce
const Layout = () => {
    // 2. Прослойка, которая всегда отображает навигацию, и контент, в зависимости от адреса
  return (
    <div>
        <Navigation />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout