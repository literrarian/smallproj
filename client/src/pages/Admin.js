import React, {useState} from 'react';
import {Button, Container, Col, Row} from "react-bootstrap";
import CreateGenre from '../components/modals/CreateGenre'
import CreateGame from '../components/modals/CreateGame'
const Admin = () => {
    const [gameVisible,setGameVisible] = useState(false)
    const [genreVisible,setGenreVisible] = useState(false)
    return (
        <Container fluid={true} className={"flex-d flex-row align-items-center p-4"}>
            <Row>
                <Col md={2} className={"d-flex flex-column"}>
                    <h4>Добавить на сайт</h4>
                    <Button variant={"dark"} className={"mt-2"} onClick={()=> setGameVisible(true)}>Добавить игру</Button>
                    <Button variant={"dark"} className={"mt-2"} onClick={()=> setGenreVisible(true)}>Добавить жанр</Button>
               </Col>
                <Col md={10} className={"text-center"}>
                    <h2>Статистика</h2>
                    графики графики графики
                    какой-то экспорт
                </Col>
            </Row>
            <CreateGame show={gameVisible} onHide={()=> setGameVisible(false)}/>
            <CreateGenre show={genreVisible} onHide={()=>setGenreVisible(false)}/>  
        </Container>
    );
};

export default Admin;