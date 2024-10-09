import { Outlet } from "react-router"
import NavBar from "./Components/NavBar"


function Layout() {
  return (
    <>
    <NavBar/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default Layout