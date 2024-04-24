import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import Select from "react-select"
import FilterPanelMeetings from "../components/FilterPanelMeetings"
import MeetingsList from "../components/MeetingsList"
import {observer} from "mobx-react-lite";
import {Context} from '../index'
import {fetchMeetings} from '../http/MeetingAPI'

const MeetingCataloguePage = observer(()=>{
    const {meeting} = useContext(Context)
    useEffect(()=>{
        fetchMeetings().then(data => meeting.setMeetings(data.rows))
    },[meeting])
    return (
        <Container fluid>
            <Row className={"mt-5"}>
                <FilterPanelMeetings/>
                <Col md={9}>
                    <MeetingsList/>
                </Col>
            </Row>
        </Container>
    );
});

export default MeetingCataloguePage;