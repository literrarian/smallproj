import React, {useState} from 'react';
import {Button, Container, Col, Row} from "react-bootstrap";
import CreateGenre from '../components/modals/CreateGenre'
import CreateGame from '../components/modals/CreateGame'
import UpdateGame from '../components/modals/UpdateGame'
import DeleteGame from '../components/modals/DeleteGame'
import UpdateGenre from '../components/modals/UpdateGenre'
const Admin = () => {
    const [gameVisible,setGameVisible] = useState(false)
    const [genreVisible,setGenreVisible] = useState(false)
    const [gameUpdVisible,setGameUpdVisible] = useState(false)
    const [gameUpdGenre,setUpdGenreVisible] = useState(false)
    const [gameDel,setGameDelVisible] = useState(false)
    return (
        <Container fluid={true} className={"flex-d flex-row align-items-center p-4"}>
            <Row>
                <Col md={2} className={"d-flex flex-column"}>
                    <h4>Добавить</h4>
                    <Button variant={"dark"} className={"mt-2"} onClick={() => setGameVisible(true)}>Добавить игру</Button>
                    <Button variant={"dark"} className={"mt-2"} onClick={() => setGenreVisible(true)}>Добавить жанр</Button>
                    <h4 className={"mt-2"}>Изменить</h4>
                    <Button variant={"dark"} className={"mt-2"} onClick={() => setGameUpdVisible(true)}>Изменить игру</Button>
                    <Button variant={"dark"} className={"mt-2"} onClick={() => setUpdGenreVisible(true)}>Изменить жанр</Button>
                    <h4 className={"mt-2"}>Удалить</h4>
                    <Button variant={"dark"} className={"mt-2"} onClick={() => setGameDelVisible(true)}>Удалить игру</Button>
                </Col>
                <Col md={10} className={"text-center"}>
                    <h2>Статистика</h2>
                    графики графики графики
                    какой-то экспорт
                </Col>
            </Row>
            <CreateGame show={gameVisible} onHide={() => setGameVisible(false)}/>
            <CreateGenre show={genreVisible} onHide={()=>setGenreVisible(false)}/>  
            <UpdateGame show={gameUpdVisible} onHide={()=>setGameUpdVisible(false)}/>
            <UpdateGenre show={gameUpdGenre} onHide={()=>setUpdGenreVisible(false)}/>
            <DeleteGame show={gameDel} onHide={()=>setGameDelVisible(false)}/>
        </Container>
    );
};

export default Admin;