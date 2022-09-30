import Class from './Header.module.css'
import logo from '../../../assets/photos/logo.png'
import { useEffect, useState } from 'react'
import { Collapse, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

import arrow from '../../../assets/photos/arrow_1.png'

function Header(props: any) {

    const navigator = useNavigate()

    const [opened, setOpened] = useState(false)
    const toggle = () => setOpened(!opened)

    let routes = [
        {
            name: 'Редактор расписания',
            to: '/editor'
        },
        {
            name: 'Расписание',
            to: '/schedule'
        },
        // {
        //     name: 'События',
        //     to: '/events'
        // }
    ]

    let goToRoute = (to: string) => {
        navigator(to)
    }

    return (
        <header>
            <Navbar color="faded" light className={`${Class.Header}`}>
                <div className={`${Class.block} container center`}>
                    <NavbarBrand href="/" className={`${Class.logo}`}>
                        <img src={logo} />
                    </NavbarBrand>
                    <Nav className={`${Class.nav}`}>
                        {
                            routes.map(
                                (value: any, index: number) => {
                                    return (
                                        <NavLink href={value.to} key={index}>{value.name}</NavLink>
                                    )
                                }
                            )
                        }
                    </Nav>
                    <Dropdown isOpen={opened} toggle={toggle} className={`${Class.dropdown}`}>
                            <DropdownToggle
                                data-toggle="dropdown"
                                tag="div"
                                className={`${Class.toggler}`}
                            >
                                <img src={arrow} className={`${Class.toggler_img} ${opened && Class.rotated}`} onClick={toggle} />
                            </DropdownToggle>
                            <DropdownMenu>
                                {
                                    routes.map(
                                        (value: any, index: number) => {
                                            return (
                                                <DropdownItem
                                                    key={index}
                                                    onClick={
                                                        () => {
                                                            goToRoute(value.to)
                                                        }
                                                    }
                                                >
                                                    {value.name}
                                                </DropdownItem>
                                            )
                                        }
                                    )
                                }
                            </DropdownMenu>
                        </Dropdown>

                </div>
                {/* <hr className={`${Class.line} container`} /> */}
            </Navbar>
        </header>
    )
}

export default Header