import React, {Component, useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Dropdown, Form, Row} from "react-bootstrap";
import {Button,Col} from "react-bootstrap";

import {Context} from '../../index'

const CreateGame = ({show,onHide}) => {
    const {genre} = useContext(Context)
    const [detail,setDetail] = useState([])
    const addDetail = () =>{
        setDetail([...detail,{title:'',description: '', number:Date.now()}])
    }
    const removeDetail = (number) =>{
        setDetail(detail.filter(i => i.number !== number))
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
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
                        placeholder = {"Название игры..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder = {"Возрастное ограничение..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder = {"Количество игроков..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        type={"file"}
                        placeholder = {"Картинка..."}
                    />
                    <Dropdown className={"mt-2"}>
                      <Dropdown.Toggle> Жанр</Dropdown.Toggle>  
                        <Dropdown.Menu>
                            {genre.genres.map(genre=>
                            <Dropdown.Item key={genre.id}>{genre.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant={"outline-dark"} className={"mt-2"} onClick={addDetail}>Добавить новую характеристику</Button>
                    {
                        detail.map(i=>
                        <Row className={"mt-2"} key={i.number}>
                           <Col md={4}>
                               <Form.Control
                                   placeholder={"Название характиристики"} 
                               />
                           </Col>
                            <Col md={4}>
                                <Form.Control
                                placeholder={"Описание характеристики"}>

                                </Form.Control>
                            </Col>
                            <Col>
                                <Button variant={"outline-dark"} onClick={()=> removeDetail(i.number)}>Удалить</Button>
                            </Col>
                        </Row>)
                    }
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"dark"} onClick={onHide}>Закрыть</Button>
                <Button variant={"dark"} onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateGame;