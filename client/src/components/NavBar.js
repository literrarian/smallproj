import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Context} from '../index'
import {NavLink} from "react-router-dom";
import {GAME_CAT_ROUTE} from '../utils/consts'
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite"
export const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color:'white'}} to={GAME_CAT_ROUTE}> Игрища </NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color:'white'}}>
                        <Button variant={"outline-light"}>Панель администратора</Button>
                        <Button variant={"outline-light"}className={"ms-2"}>Выйти</Button>
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