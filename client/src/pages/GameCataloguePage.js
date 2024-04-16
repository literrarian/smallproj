import React, {useState} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import Select from "react-select"
import FilterPanel from "../components/FilterPanel"
import GamesList from "../components/GamesList"
const GameCataloguePage = () => {
   
    return (
        <Container fluid>
            <Row className={"mt-5"}>
               <FilterPanel/>
                <Col md={9}>
                    <GamesList/>
                </Col>
            </Row>
        </Container>
    );
};

export default GameCataloguePage;