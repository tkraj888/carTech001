import Cookies from "js-cookie"
import FooterF from "../components/Footer"
import { StickyNavbar } from "../components/navbars/StickyNavbar"
import {  Outlet } from 'react-router-dom'

function AppLayout2() {

    // const location = useLocation()
    const token = Cookies.get('token')
    token;
    // console.log(token)

    return (
        <div>
            <>
                <nav>
                    <StickyNavbar />
                </nav>
                <main>
                    <Outlet />
                </main>
                <FooterF />
            </>
        </div>
    )
}

export default AppLayout2
