import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from 'react-router-dom' 
import {fetchOneGame} from '../http/GameAPI'
const GamePage = () => {
    const [game,setGame] = useState({detail:[]})
    const [loading,setLoading] = useState(true)
    const {id} = useParams()
    useEffect(()=>{
       fetchOneGame(id).then(data => setGame(data))
           .finally(() => setLoading(false))
    },[])
    
    return (
        <Container className={"mt-4"}>
            {loading?
                <Spinner animation={"grow"}/>
            :
            <Row>
                <Col md={6}>
                    <Image width={400} height={400} src={process.env.REACT_APP_API_URL + game.img}/>
                </Col>
                <Col md={6} className={"d-flex flex-column align-items-center"}>
                    <Row>
                        <h2>{game.name}</h2>
                        <Row className={"p-2"}>Возрастное ограничение: {game.age_restriction}</Row>
                        <Row className={"p-2"}>Количество игроков: {game.players_num}</Row>
                        {console.log(game)}
                        <Row className={"p-2"}>Жанр: {game.genres? game.genres[0].name : ''}</Row>
                       
                        
                        <div className={"d-flex flex-column mt-4"}>
                            {game.detail.map(info =>
                                <Row key={info.id} className={"p-2"}
                                     style={{background: info.id % 2 === 0 ? 'lightgray' : 'transparent'}}>
                                    {info.title}: {info.description}
                                </Row>)}
                        </div>
                    </Row>
                </Col>
            </Row>
            }
        </Container>
    );
};

export default GamePage;