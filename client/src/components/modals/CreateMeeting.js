import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Dropdown, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Context} from '../../index'

const CreateMeeting = ({show,onHide}) => {
    const {game} = useContext(Context)
    const [inputType, setInputType] = useState("text");
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить встречу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder = {"Название встречи..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder = {"Описание..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder = {"Возрастное ограничение..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        placeholder = {"Слоты..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        type={inputType}
                        placeholder="Дата..." //Костылина с стекоферфлоу - без нее не показывает плейсхолдер
                        onFocus={() => setInputType("date")}
                        onBlur={() => setInputType("text")}

                    />
                    <Form.Control
                        className={"mt-2"}
                        type={"file"}
                        placeholder = {"Картинка..."}
                    />
                    <Dropdown className={"mt-2"}>
                        <Dropdown.Toggle>Выберите игру</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {game.games.map(game=>
                                <Dropdown.Item key={game.id}>{game.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"dark"} onClick={onHide}>Закрыть</Button>
                <Button variant={"dark"} onClick={onHide}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMeeting;