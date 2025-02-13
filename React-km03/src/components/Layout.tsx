import Header from "./Header"
import { Outlet } from "react-router-dom"
const Layout = () => {
  return (
    
    <>
        <Header />
        <main>
            <Outlet />
        </main>

        <footer>Det är sidfot.</footer>
    </>
  )
}

export default Layout