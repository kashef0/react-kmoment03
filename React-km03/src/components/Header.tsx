import { NavLink } from "react-router-dom"
import './Header.css'
import useAuth from "../Hooks/useAuth";

const Header = () => {
  const token = localStorage.getItem("token");
  const { login, logout } = useAuth();
  return (
    <header>
        <ul>
          <li><NavLink className={"link"} to="/">StartSida</NavLink></li>
          <li><NavLink className={"link"} to="/Profile">Profil</NavLink></li>
          <li><NavLink className={"link"} to="/CategoryPage">Kategorier</NavLink></li>
        </ul>
        <ul className="nav-right">
          {
            !token ? <li><NavLink className={"link"} to="/LoginPage">Logga in</NavLink></li> : <button className="btn" onClick={() => logout()}>Logut</button>
          }
          
        </ul>
    </header>
  )
}

export default Header