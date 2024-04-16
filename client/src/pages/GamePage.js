import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";

const GamePage = () => {
    const game =  {id:1, name:'Игра1',age_restriction:'5+',players_num:'2', img:'https://steamuserimages-a.akamaihd.net/ugc/5088536233466642530/35D9F1EF85BA81DFB7F091E2AFF156F9C703CDC6/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'}
    const description = [
        {id:1, title:'Жанр', description:'Жанр'},
        {id:2, title:'Ково игроков', description:'4'},
        {id:3, title:'Возраст', description:'10+'},
        {id:4, title:'Описание', description:'Блаблалалалалаллалаала'},
    ]
    return (
        <Container className={"mt-4"}>
            <Row>
                <Col md={6}>
                    <Image width={400} height={400} src={game.img}/>
                </Col>
                <Col md={6} className={"d-flex flex-column align-items-center"}>
                    <Row>
                        <h2>{game.name}</h2>
                        <div className={"d-flex flex-column mt-4"}>
                            {description.map(info =>
                            <Row key={info.id} className={"p-2"} style={{background: info.id % 2 ===0? 'lightgray':'transparent'}}>
                                {info.title}: {info.description}
                            </Row>)}
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default GamePage;