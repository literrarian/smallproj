import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
const CreateGenre = ({show,onHide}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Добавить жанр
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                      placeholder = {"Название жанра..."}  
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder = {"Описание жанра..."}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"dark"} onClick={onHide}>Закрыть</Button>
                <Button variant={"dark"} onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGenre;