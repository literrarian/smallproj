import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import Select from "react-select"
import FilterPanelMeetings from "../components/FilterPanelMeetings"
import MeetingsList from "../components/MeetingsList"
import {observer} from "mobx-react-lite";
import {Context} from '../index'
import {fetchMeetings} from '../http/MeetingAPI'
import Pages from '../components/Pages'

const MeetingCataloguePage = observer(()=>{
    const {meeting} = useContext(Context)
    useEffect(()=>{
        fetchMeetings(null,null,null,5,1).then(data => {
            meeting.setMeetings(data.rows)
            meeting.setTotalCount(data.count)
        })
    },[meeting])

    useEffect(() => {
        fetchMeetings(meeting.gameId,meeting.slotsNum,meeting.ageRestriction,5,meeting.page).then(data => {
            meeting.setMeetings(data.rows)
            meeting.setTotalCount(data.count)
        })
    }, [meeting.gameId,meeting.slotsNum,meeting.ageRestriction,meeting.page]);
    return (
        <Container fluid>
            <Row className={"mt-5"}>
                <FilterPanelMeetings/>
                <Col md={9}>
                    <MeetingsList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default MeetingCataloguePage;