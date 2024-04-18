import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import Select from "react-select"
import FilterPanel from "../components/FilterPanel"
import GamesList from "../components/GamesList"
import {observer} from "mobx-react-lite";
import {Context} from '../index'
import {fetchGenres} from '../http/GenreAPI'
import {fetchGames} from '../http/GameAPI'

const GameCataloguePage = observer(() => {
    const {game} = useContext(Context)
    const {genre} = useContext(Context)
    useEffect(()=>{
        fetchGenres().then(data => genre.setGenres(data))
        fetchGames().then(data => game.setGames(data.rows))
    },[])
    
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
});

export default GameCataloguePage;