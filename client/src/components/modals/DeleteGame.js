import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Dropdown, Form, Row, Button, Col} from "react-bootstrap";
import {Context} from '../../index';
import Select from "react-select";
import {observer} from "mobx-react-lite";
import {deleteGame} from '../../http/GameAPI'

const UpdateGame = observer( ({show,onHide}) => {
    const {game} = useContext(Context);
    const [selectedGame, setSelectedGame] = useState(0);
    
   
    // useEffect(() => {
    //
    //  
    // }, []);
    //

    const removeData = () =>{
        deleteGame(selectedGame).then(data=>handleClose())
    }
    const resetForm = () =>{
        setSelectedGame(0)
    }
    const handleClose = () => {
        resetForm();
        onHide();
    }
    
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить игру
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Select
                        placeholder={"Игра..."}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        options={game.games.map((gen) => ({
                            value: gen.id,
                            label: gen.name,
                        }))}
                        onChange={(value) => setSelectedGame(value.value)}//передаем id
                        controlShouldRenderValue={true}
                        isOptionDisabled={(option) => option.isdisabled}
                    />
                    <hr></hr>
                    
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"dark"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"dark"} onClick={removeData}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default UpdateGame;