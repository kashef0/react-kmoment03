import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header>
        <ul>
            <li><NavLink to="/">StartSida</NavLink></li>
            <li><NavLink to="/LoginPage">Login</NavLink></li>
            <li><NavLink to="/Profile">profile</NavLink></li>
        </ul>
    </header>
  )
}

export default Header