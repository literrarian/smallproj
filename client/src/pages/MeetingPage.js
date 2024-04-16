import React, {useContext} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from '../index'
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from '../utils/consts'
const MeetingPage = () => {
    const meeting = {id:1, name:'Встреча1',description:'Описание1',age_restriction:'4+',slots_num:'3',m_date:'09.04.2024',game_id:'1',img:'https://sun9-26.userapi.com/impg/CNG4p4CEej-3HGXzBKT-IWvBWzuMlfLqnUF-nA/_P7DoQnKY24.jpg?size=1440x1440&quality=95&sign=2b28705f44ab68dfb80d259abeb2b7d2&type=album'}
    const {user} = useContext(Context)
    const navigate = useNavigate();
    return (
        <Container className={"mt-4"}>
           <Row>
            <Col md={4}>
                <Image width={400} height={400} src={meeting.img}/>
            </Col>
                <Col md={4} className={"d-flex flex-column align-items-center"}>
                    <Row>
                        <h2>{meeting.name}</h2>
                        <div className={"d-flex flex-column mt-4"}>
                            
                            <Row>Название: {meeting.name}</Row>   
                            <Row>Возрастное ограничение: {meeting.age_restriction}</Row>   
                            <Row>Слоты: {meeting.slots_num}</Row>
                            <Row>Свободных слотов: {}</Row>
                            <Row>Дата: {meeting.m_date}</Row>   
                            <Row>Игра: {meeting.game_id}</Row>   
                            <Row>Описание: {meeting.description}</Row>
                            {user.isAuth?
                            <Button variant={"dark"}>
                                Записаться
                            </Button> 
                                :
                                <Button variant={"dark"} onClick={()=> navigate(LOGIN_ROUTE)}>Войти</Button>
                            }
                        </div>
                    </Row>
                </Col>
           </Row>
        </Container>
    );
};

export default MeetingPage;