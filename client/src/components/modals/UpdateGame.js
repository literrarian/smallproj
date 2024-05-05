import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Dropdown, Form, Row, Button, Col} from "react-bootstrap";
import {Context} from '../../index';
import {fetchOneGame} from '../../http/GameAPI';
import Select from "react-select";
import {observer} from "mobx-react-lite";
import {updateGame} from '../../http/GameAPI'
import {fetchGames} from '../../http/GameAPI'

const UpdateGame = observer( ({show,onHide}) => {
    const {genre} = useContext(Context);
    const {game} = useContext(Context);
    const [selectedGame, setSelectedGame] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState({});
    const [name, setName] = useState('');
    const [ageLimit, setAgeLimit] = useState('');
    const [playerCount, setPlayerCount] = useState('');
    const [details, setDetails] = useState([]);
    const [fileName, setFileName] = useState(null);
    const [formError, setFormError] = useState('');
    const loadData = async (gameId) => {
        try {
            const gameData = await fetchOneGame(gameId);
            setName(gameData.name);
            setAgeLimit(gameData.age_restriction);
            setPlayerCount(gameData.players_num);
            setDetails(gameData.detail)
            setSelectedGenre(gameData.genres[0])

        } catch (error) {
            console.error('Ощибк:', error);
        }
    }
    useEffect(() => {
        
        if (selectedGame!==0) {
            loadData(selectedGame);
        }
    }, [selectedGame]);

    useEffect(()=>{
        fetchGames(null,null,null,null,null).then(data => {
            game.setGames(data.rows)
        })
    },[])

    const selectFile = e =>{
        setFileName(e.target.files[0])
    }
    
    
     const resetForm = () =>{
         setName('');
         setAgeLimit('');
         setPlayerCount('');
         setFileName('')
         setSelectedGame(0)
         setSelectedGenre({})
         setFormError('')
     }
     const handleClose = () => {
        resetForm();
         onHide();
     }
    const validateForm = () => {
        if (!name || !ageLimit || !playerCount || !selectedGenre.id || !fileName) {
            setFormError('Заполните все поля');
            return false;
        }
        setFormError('');
        return true;
    }
    const updateData = async () =>{
        if (!validateForm()) return;
        try{
           const formData = new FormData()
           formData.append('name',name)
           formData.append('age_restriction',ageLimit)
           formData.append('players_num',playerCount)
           formData.append('genre_id',selectedGenre.id)
           formData.append('img',fileName)
           formData.append('detail',JSON.stringify(details))
           updateGame(selectedGame,formData).then(data=>handleClose()) 
       } catch (e) {
           alert(e)
       }
    }

   
    const addDetail = () => {
        setDetails([...details, { title: '', description: '', number: Date.now() }]);
    }

    const removeDetail = (number) => {
        setDetails(details.filter(i => i.number !== number));
    }
    const changeDetail = (key,value,number)=>{
        setDetails(details.map(i=> i.number===number?{...i, [key]:value}:i))
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
                    <label className={"fs-6 fst-italic mt-2"}>Название</label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                        placeholder={"Название игры..."}
                    />
                    <label className={"fs-6 fst-italic mt-2"}>Возрастное ограничение</label>
                    <Form.Control
                        value={ageLimit}
                        onChange={(e) => setAgeLimit(e.target.value)}
                        placeholder={"Возрастное ограничение..."}
                    />
                    <label className={"fs-6 fst-italic mt-2"}>Количество игроков</label>
                    <Form.Control
                        value={playerCount}
                        onChange={(e) => setPlayerCount(e.target.value)}
                        placeholder={"Количество игроков..."}
                    />
                    <label className={"fs-6 fst-italic mt-2"}>Изображение</label>
                    <Form.Control
                        type={"file"}
                        placeholder={"Картинка..."}
                        onChange={selectFile}
                    />
                    <Dropdown className={"mt-2"}>
                        <Dropdown.Toggle> {Object.keys(selectedGenre).length ===0 ? "Жанр":selectedGenre.name }</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {genre.genres.map(genre =>
                                <Dropdown.Item key={genre.id}
                                               onClick={() => setSelectedGenre(genre)}>{genre.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button variant={"outline-dark"} className={"mt-2"} onClick={addDetail}>Добавить новую
                        характеристику</Button>
                    {
                        details.map(i =>
                            <Row className={"mt-2"} key={i.number}>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.title}
                                        placeholder={"Название характиристики"}
                                        onChange={(e)=>changeDetail('title',e.target.value, i.number)}>
                                    </Form.Control>
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        value={i.description}
                                        onChange={(e)=>changeDetail('description',e.target.value, i.number)}
                                        placeholder={"Описание характеристики"}>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Button variant={"outline-dark"}
                                            onClick={() => removeDetail(i.number)}>Удалить</Button>
                                </Col>
                            </Row>)
                    }
                    {formError && <p style={{ color: 'red' }}>{formError}</p>}
                </Form>

            </Modal.Body>
            <Modal.Footer>
            <Button variant={"dark"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"dark"} onClick={updateData}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default UpdateGame;