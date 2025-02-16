import { NavLink, useNavigate } from "react-router-dom"
import './Header.css'
import useAuth from "../Hooks/useAuth";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/LoginPage')
  }
  return (
    <header>
        <ul>
          <li><NavLink className={"link"} to="/BlogPage">{token? "StartSida": "Blog"}</NavLink></li>
          {
            token &&
            <li><NavLink className={"link"} to="/CategoryPage">Kategorier</NavLink></li>
          }
        </ul>
        <ul className="nav-right">
          {
            !token ? <li><NavLink className={"link"} to="/LoginPage">Logga in</NavLink></li> : <button className="btn" onClick={handleLogout}>Logut</button>
          }
          
        </ul>
    </header>
  )
}

export default Header