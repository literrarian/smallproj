﻿import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {createGenre} from '../../http/GenreAPI'
const CreateGenre = ({show,onHide}) => {
    const [name,setName] = useState('')
    const [descr,setDescr] = useState('')
    const [formError, setFormError] = useState('');

    const validateForm = () => {
        if (!name || !descr) {
            setFormError('Заполните все поля');
            return false;
        }
        setFormError('');
        return true;
    }
    const resetForm = () =>{
        setName('');
        setDescr('');
        setFormError('')
    }
    const handleClose = () => {
        resetForm();
        onHide();
    }
    const addGenre = ()=>{
        if (!validateForm()) return;
        const formData = new FormData()
        formData.append('name',name)
        formData.append('description',descr)
        console.log(formData)
        createGenre(formData).then(data => {
            setName('')
            setDescr('')
            onHide()
        })
        
    }
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
                        value={name}
                        onChange={e=> setName(e.target.value)}
                        placeholder = {"Название жанра..."}  
                    />
                    <Form.Control
                        value={descr}
                        onChange={e=> setDescr(e.target.value)}
                        className={"mt-2"}
                        placeholder = {"Описание жанра..."}
                    />
                    {formError && <p style={{ color: 'red' }}>{formError}</p>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"dark"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"dark"} onClick={addGenre}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateGenre;