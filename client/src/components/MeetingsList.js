import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Image, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {MEETING_ROUTE} from  '../utils/consts'


const MeetingsList = observer(() => {
    const {meeting} = useContext(Context)
    const navigate = useNavigate()
    return (

        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Название</th>
                <th>Возрастное ограничение</th>
                <th>Слоты</th>
                <th>Игра</th>
                <th>Дата</th>
            </tr>
            </thead>
            <tbody>
            {meeting.meetings.map((meetingItem, index) => (
                <tr key={index} onClick={() => navigate(MEETING_ROUTE + '/' + meetingItem.id)}>
                    <td>{meetingItem.name}</td>

                    <td>{meetingItem.age_restriction}</td>
                    <td>{meetingItem.slots_num}</td>
                    <td>{meetingItem.game.name? meetingItem.game.name:"бябябя"}</td>
                    <td>{meetingItem.m_date}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
});

export default MeetingsList;