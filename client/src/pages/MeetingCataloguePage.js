import React, {useState} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import Select from "react-select"
import FilterPanelMeetings from "../components/FilterPanelMeetings"
import MeetingsList from "../components/MeetingsList"
const MeetingCataloguePage = () => {

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
};

export default MeetingCataloguePage;