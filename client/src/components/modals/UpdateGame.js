import React, {useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Dropdown, Form, Row, Button, Col} from "react-bootstrap";
import {Context} from '../../index';
import {fetchOneGame} from '../../http/GameAPI';
import Select from "react-select";
import {forEach} from "react-bootstrap/ElementChildren";
const UpdateGame = ({ show, onHide }) => {
    const {genre} = useContext(Context);
    const {game} = useContext(Context);
    const [selectedGame, setSelectedGame] = useState({});
    const [name, setName] = useState('');
    const [ageLimit, setAgeLimit] = useState('');
    const [playerCount, setPlayerCount] = useState('');
    const [gGenre, setGGenre] = useState('');
    const [details, setDetails] = useState([]);
    const [fileName, setFileName] = useState(null);
    const loadData = async (gameId) => {
        try {
            const gameData = await fetchOneGame(gameId); 
             setName(gameData.name);
             setAgeLimit(gameData.age_restriction);
             setPlayerCount(gameData.players_num);
             setGGenre(gameData.genre);
             setFileName(gameData.img)
             setGGenre(gameData.genres)
            console.log(gameData)
            
            
        } catch (error) {
            console.error('Ощибк:', error);
        }
    }
    const updateData = async () =>{
        const formData = new FormData()
        formData.append('name',name)
        formData.append('age_rescrtiction',ageLimit)
        formData.append('players_num',playerCount)
        formData.append('gGenre',playerCount)
        formData.append('img',fileName)
        console.log(formData)
        
        }
    

    const addDetail = () => {
        setDetails([...details, { title: '', description: '', number: Date.now() }]);
    }

    const removeDetail = (number) => {
        setDetails(details.filter(i => i.number !== number));
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
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
                        onChange={(value)=> game.setSelectedGame(value.value)}//передаем id
                        controlShouldRenderValue={true}
                        isOptionDisabled={(option) => option.isdisabled}
                    />
                    <Button 
                        className={"mt-2"} 
                        size="sm"
                        onClick={()=>loadData(game.selectedGame)}
                    >Изменить</Button>
                    <hr></hr>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={"mt-2"}
                        placeholder = {"Название игры..."}
                    />
                    <Form.Control
                        value={ageLimit}
                        onChange={(e) => setAgeLimit(e.target.value)}
                        className={"mt-2"}
                        placeholder = {"Возрастное ограничение..."}
                    />
                    <Form.Control
                        value={playerCount}
                        onChange={(e) => setPlayerCount(e.target.value)}
                        className={"mt-2"}
                        placeholder = {"Количество игроков..."}
                    />
                    <Form.Control
                        
                        className={"mt-2"}
                        type={"file"}
                        placeholder = {"Картинка..."}
                    />
                    <Select className={"mt-2"}
                        placeholder={"Жанр..."}
                        value={gGenre? { value: gGenre[0].id, label: gGenre[0].name }:{value:undefined, label:undefined}}
                        
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        options={genre.genres.map((gen) => ({
                            value: gen.id,
                            label: gen.name,
                        }))}
                        onChange={(value)=> genre.setSelectedGenre(value.value)} //передаем id
                        controlShouldRenderValue={true}
                        isOptionDisabled={(option) => option.isdisabled}
                    />
                    <Button variant={"outline-dark"} className={"mt-2"} onClick={addDetail}>Добавить новую характеристику</Button>
                    {
                        details.map(i=>
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
                <Button variant={"dark"} onClick={updateData}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateGame;