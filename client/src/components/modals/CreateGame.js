﻿import React, {Component, useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Dropdown, Form, Row} from "react-bootstrap";
import {Button,Col} from "react-bootstrap";
import {fetchGenres} from '../../http/GenreAPI'
import {createGame} from '../../http/GameAPI'
import {Context} from '../../index'
import {observer} from "mobx-react-lite";

const CreateGame =observer( ({show,onHide}) => {
    const {genre} = useContext(Context)
    const {game} = useContext(Context)
    const [detail,setDetail] = useState([])
    const [name, setName] = useState('');
    const [ageLimit, setAgeLimit] = useState('');
    const [playerCount, setPlayerCount] = useState('');
    const [gGenre, setGGenre] = useState('');
    const [fileName, setFileName] = useState(null);

    const [formError, setFormError] = useState('');

    // useEffect(()=>{
    //     fetchGenres().then(data => genre.setGenres(data))
    // },[])
    const resetForm = () =>{
        setName('');
        setAgeLimit('');
        setPlayerCount('');
        setFileName('')
        game.setSelectedGameGenre('')
        setFormError('')
    }
    const handleClose = () => {
        resetForm();
        onHide();
    }
    const selectFile = e =>{
        setFileName(e.target.files[0])
    }
    const addDetail = () =>{
        setDetail([...detail,{title:'',description: '', number:Date.now()}])
    }
    const removeDetail = (number) =>{
        setDetail(detail.filter(i => i.number !== number))
    }
    const changeDetail = (key,value,number)=>{
        setDetail(detail.map(i=> i.number===number?{...i, [key]:value}:i))
    }
    const validateForm = () => {
        if (!name || !ageLimit || !playerCount || !game.selectedGameGenre.id || !fileName) {
            setFormError('Заполните все поля');
            return false;
        }
        setFormError('');
        return true;
    }
    const addGame = ()=>{
        if (!validateForm()) return;
       const formData = new FormData()
        formData.append('name',name)
        formData.append('age_restriction',ageLimit)
        formData.append('players_num',playerCount)
        formData.append('genre_id',game.selectedGameGenre.id)
        formData.append('img',fileName)
        formData.append('detail',JSON.stringify(detail))
        
        createGame(formData).then(data=>handleClose()) 
    }
    
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить игру
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        placeholder = {"Название игры..."}
                    />
                    <Form.Control
                        value={ageLimit}
                        onChange={e=>setAgeLimit(e.target.value)}
                        className={"mt-2"}
                        placeholder = {"Возрастное ограничение..."}
                    />
                    <Form.Control
                        value={playerCount}
                        onChange={e=>setPlayerCount(e.target.value)}
                        className={"mt-2"}
                        placeholder = {"Количество игроков..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        type={"file"}
                        placeholder = {"Картинка..."}
                        onChange={selectFile}
                    />
                    <Dropdown className={"mt-2"}>
                      <Dropdown.Toggle> {game.selectedGameGenre.name||"Жанр"}</Dropdown.Toggle>  
                        <Dropdown.Menu>
                            {genre.genres.map(genre=>
                            <Dropdown.Item key={genre.id} onClick={()=>game.setSelectedGameGenre(genre)}>{genre.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant={"outline-dark"} className={"mt-2"} onClick={addDetail}>Добавить новую характеристику</Button>
                    {
                        detail.map(i=>
                        <Row className={"mt-2"} key={i.number}>
                           <Col md={4}>
                               <Form.Control
                                   value={i.title}
                                   placeholder={"Название характиристики"}
                                   onChange={(e)=>changeDetail('title',e.target.value, i.number)}
                               />
                           </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e)=>changeDetail('description',e.target.value, i.number)}
                                    placeholder={"Описание характеристики"}>

                                </Form.Control>
                            </Col>
                            <Col>
                                <Button variant={"outline-dark"} onClick={()=> removeDetail(i.number)}>Удалить</Button>
                            </Col>
                        </Row>)
                    }
                    {formError && <p style={{ color: 'red' }}>{formError}</p>}
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"dark"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"dark"} onClick={addGame}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateGame;