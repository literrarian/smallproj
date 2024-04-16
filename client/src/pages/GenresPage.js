import React, {useState} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import Select from "react-select"
import GenresList from "../components/GenresList"
const GenresPage = () => {

    return (
        <Container >
            <Row className={"mt-5"}>
                <Col md={9}>
                    <GenresList/>
                </Col>
            </Row>
        </Container>
    );
};

export default GenresPage;