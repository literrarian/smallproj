import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Context} from '../index'
import {NavLink} from "react-router-dom";
import {GAME_CAT_ROUTE} from '../utils/consts'
import {MEETING_CAT_ROUTE} from '../utils/consts'
import {GENRE_ROUTE} from '../utils/consts'
import {ADMIN_ROUTE} from '../utils/consts'
import {LOGIN_ROUTE} from '../utils/consts'
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite"
import {useNavigate} from "react-router-dom";
export const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container fluid>
                <div>
                    <NavLink style={{color:'white'}} to={GAME_CAT_ROUTE}> Каталог игр </NavLink>
                    <NavLink style={{color:'white'}} className={"p-1"} to={MEETING_CAT_ROUTE}> Встречи </NavLink>
                    <NavLink style={{color:'white'}} className={"p-1"} to={GENRE_ROUTE}> Жанры </NavLink>
                </div>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color:'white'}}>
                        <Button variant={"outline-light"} onClick={()=> navigate(ADMIN_ROUTE)}>Панель администратора</Button>
                        <Button variant={"outline-light"}className={"ms-2"} onClick={()=> navigate(LOGIN_ROUTE)}>Выйти</Button>
                    </Nav>
                        :
                    <Nav className="ml-auto" style={{color:'white'}}>
                        <Button variant={"outline-light"} onClick={()=>user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;