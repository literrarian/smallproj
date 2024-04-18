﻿import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import Select from "react-select"
import GenresList from "../components/GenresList"
import {fetchGenres} from '../http/GenreAPI'
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const GenresPage = observer(() => {
    const [genre,setGenre] = useState({})
    
    useEffect(()=>{
        fetchGenres().then(data => setGenre(data.rows))
    },[])
    return (
        <Container >
            <Row className={"mt-5"}>
                <Col md={9}>
                    <GenresList/>
                </Col>
            </Row>
        </Container>
    );
});

export default GenresPage;