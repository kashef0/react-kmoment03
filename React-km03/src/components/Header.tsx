import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <ul>
        <li><NavLink to="/">StartSida</NavLink></li>
        <li><NavLink to="/LoginPage">Logga in</NavLink></li>
        <li><NavLink to="/Profile">Profil</NavLink></li>
        <li><NavLink to="/CategoryPage">Kategorier</NavLink></li>
        </ul>
    </header>
  )
}

export default Header