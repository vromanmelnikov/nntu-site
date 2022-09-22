import { Outlet } from "react-router"
import HeaderContainer from "../../ui/Header/Header.container"

import Class from './System.module.css'

function System(props: any) {

    return (
        <div className={`${Class.System}`}>
            <HeaderContainer />
            <main className={`${Class.main} container center`}>
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default System 