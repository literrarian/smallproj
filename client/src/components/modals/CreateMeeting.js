import React, {Component, useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Dropdown, Form, Row} from "react-bootstrap";
import {Button,Col} from "react-bootstrap";
import {fetchGenres} from '../../http/GenreAPI'
import {createMeeting} from '../../http/MeetingAPI'
import {Context} from '../../index'
import {observer} from "mobx-react-lite";
import Select from "react-select";

const CreateMeeting=observer( ({show,onHide}) => {
    
    const {game} = useContext(Context)
    const {user} = useContext(Context)
    const {meeting} = useContext(Context);
    
    const [name, setName] = useState('');
    const [ageLimit, setAgeLimit] = useState('');
    const [playerCount, setPlayerCount] = useState('');
    const [selectedGame,setSelectedGame] = useState(0)
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [fileName, setFileName] = useState(null);
    const [inputType, setInputType] = useState("text");
    
    const resetForm = () =>{
        setName('');
        setAgeLimit('');
        setPlayerCount('');
        setFileName('')
        setSelectedGame(0)
        setDescription('')
        
    }
    const handleClose = () => {
        resetForm();
        onHide();
    }
    const selectFile = e =>{
        setFileName(e.target.files[0])
    }
    
    const addMeeting = ()=>{
        const formData = new FormData()
        formData.append('name',name)
        formData.append('description',description)
        formData.append('game_id',selectedGame)
        formData.append('age_restriction',ageLimit)
        formData.append('slots_num',playerCount)
        formData.append('m_date',date)
        formData.append('img',fileName)
        formData.append('userId',user.user.id)

        createMeeting(formData)
            .then(data => {
                meeting.setMeetings([...meeting.meetings, data]);
                handleClose();
            })
            .catch(error => {
                console.error(error);
            });
    }
    

    return (
        <Modal
            show={show}
            onHide={handleClose}
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
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        placeholder = {"Название встречи..."}
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
                        placeholder = {"Количество слотов..."}
                    />
                    <Form.Control
                        value={description}
                        onChange={e=>setDescription(e.target.value)}
                        className={"mt-2"}
                        placeholder = {"Описание..."}
                    />
                    <Form.Control
                        className={"mt-2"}
                        type={inputType}
                        placeholder="Дата..." //Костылина с стекоферфлоу - без нее не показывает плейсхолдер
                        onFocus={() => setInputType("date")}
                        onBlur={() => setInputType("text")}
                        onChange={e=>setDate(e.target.value)}

                    />
                    
                    <Select
                        className={"mt-2"}
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
                    <Form.Control
                        className={"mt-2"}
                        type={"file"}
                        placeholder = {"Картинка..."}
                        onChange={selectFile}
                    />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"dark"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"dark"} onClick={addMeeting}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default CreateMeeting;