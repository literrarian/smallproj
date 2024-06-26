﻿import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {Context} from '../index'
import {useNavigate, useParams} from "react-router-dom";
import {LOGIN_ROUTE} from '../utils/consts'
import {fetchOneMeeting} from '../http/MeetingAPI'
import {fetchOneUserName} from '../http/UserAPI'
import {signUserOnMeeting} from '../http/MeetingAPI'
import {observer} from "mobx-react-lite";
import {jwtDecode} from "jwt-decode"


const MeetingPage = observer(() => {
    const [meeting,setMeeting] = useState({})
    const [meetingPlayers,setMeetingPlayers] = useState(null)
    const [loading,setLoading] = useState(true)
    const [names,setNames] = useState([])
    const [vacantSlots,setVacantSlots] = useState(0)
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const {id} = useParams()
    const [buttonDisabled,setButtonDisabled] = useState(false)
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchOneMeeting(id);
                setMeeting(data);
                setMeetingPlayers(data.meeting_players);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (meetingPlayers) {
            getPlayerNames();
            setVacantSlots(meeting.slots_num - meetingPlayers.length);
            
        }
    }, [meetingPlayers]);
    
   
    const idToName = async (id) =>{
        try {
            const userData = await fetchOneUserName(id);
            return userData
        }
        catch (e) {
            console.log(e)
        }
    }
    const getPlayerNames = async () => {
         {
            try {
                const playerNames = [];
                for (const player of meetingPlayers) {
                    const playerName = await idToName(player.userId);
                    playerNames.push(playerName);
                }
                setNames(playerNames);
            } catch (error) {
                console.error(error);
                setNames([]);
            }
        }
    };
    
    const validateSigning = ()=>{
       let userId = jwtDecode(localStorage.getItem('token'))
        let userName = userId.nickname
        let meetingId = id
       
         if (names.includes(userName)) {
             alert('Вы уже записаны на эту встречу')
         }
        else if (vacantSlots===0)
        {
            alert('На эту встречу все слоты заняты.')
        }
        else{
            const formData = new FormData()
            formData.append('userId',userId.id)
            formData.append('meetingId',meetingId)
            const newEntry = signUserOnMeeting(formData)
            meetingPlayers.push(newEntry)
            const updatedNames = [...names, user.user.nickname]
            setNames(updatedNames)
             setButtonDisabled(true)
        }
        
    } 
    

    return (
        <Container className={"mt-4"}>
            {loading?
                <Spinner animation={"grow"}/>
                :
           <Row>
            <Col md={4}>
                <Image width={350} height={350} src={process.env.REACT_APP_API_URL+meeting.img}/>
            </Col>
                <Col md={4} className={"d-flex flex-column align-items-center"}>
                    <Row>
                        <h2>{meeting.name}</h2>
                        <div className={"d-flex flex-column mt-4 ps-4"}>
                            
                            <Row>Название: {meeting.name}</Row>   
                            <Row>Возрастное ограничение: {meeting.age_restriction}</Row>   
                            <Row>Слоты: {meeting.slots_num}</Row>
                            <Row>Свободных слотов: {vacantSlots}</Row>
                            <Row>Дата: {meeting.m_date}</Row>   
                            <Row>Игра: {meeting.game.name}</Row>   
                            <Row>Описание: {meeting.description}</Row>
                            {user.isAuth?
                            <Button variant={"dark"} disabled={buttonDisabled}onClick={()=>validateSigning()}>
                                Записаться
                            </Button> 
                                :
                                <Button variant={"dark"} onClick={()=> navigate(LOGIN_ROUTE)}>Войти</Button>
                            }
                        </div>
                    </Row>
                </Col>
               <Col md={2}>
                   <h4>Уже записаны:</h4>
                   <div className={"d-flex flex-column mt-4"}>
                       {names.map((name,index) =>
                           <Row key={index} 
                                style={{background: index % 2 === 0 ? 'lightgray' : 'transparent'}}>
                               {name}
                           </Row>)}
                   </div>
               </Col>
           </Row>
            }
        </Container>
    );
})

export default MeetingPage;