import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Context} from '../index'
import {useNavigate, useParams} from "react-router-dom";
import {LOGIN_ROUTE} from '../utils/consts'
import {fetchOneMeeting} from '../http/MeetingAPI'
const MeetingPage = () => {
    const [meeting,setMeeting] = useState({})
    const {id} = useParams()
    useEffect(()=>{
        fetchOneMeeting(id).then(data => setMeeting(data)) //при создании встречи сразу пушить создателя в player_meeting
    },[])
    const {user} = useContext(Context)
    const navigate = useNavigate();
    return (
        <Container className={"mt-4"}>
           <Row>
            <Col md={4}>
                <Image width={400} height={400} src={process.env.REACT_APP_API_URL+meeting.img}/>
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