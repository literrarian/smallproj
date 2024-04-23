import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Dropdown, Form, Row, Button, Col} from "react-bootstrap";
import {Context} from '../../index';
import {fetchOneGenre} from '../../http/GenreAPI';
import Select from "react-select";
import {observer} from "mobx-react-lite";
import {updateGenre} from '../../http/GenreAPI'

const UpdateGenre= observer( ({show,onHide}) => {
    const {genre} = useContext(Context);
    const [selectedGenre, setSelectedGenre] = useState(0);
    const [name,setName] = useState('')
    const [description, setDescription] = useState('');

    const loadData = async (genreId) => {
        try {
            const genreData = await fetchOneGenre(genreId);
            setName(genreData.name);
            setDescription(genreData.description)

        } catch (error) {
            console.error('Ощибк:', error);
        }
    }
     useEffect(() => {
    
         if (selectedGenre!==0) {
             loadData(selectedGenre);
         }
     }, [selectedGenre]);
    

    const resetForm = () =>{
        setName('');
        setDescription('');
        setSelectedGenre(0)
    }
    const handleClose = () => {
        resetForm();
        onHide();
    }
    const updateData = async () =>{
        try{
            const formData = new FormData()
            formData.append('name',name)
            formData.append('description',description)
            updateGenre(selectedGenre,formData).then(data=>handleClose())
        } catch (e) {
            alert(e)
        }
    }
    
    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Изменить жанр
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Select
                        placeholder={"Жанр..."}
                        closeMenuOnSelect={true}
                        hideSelectedOptions={false}
                        options={genre.genres.map((gen) => ({
                            value: gen.id,
                            label: gen.name,
                        }))}
                        onChange={(value) => setSelectedGenre(value.value)}//передаем id
                        controlShouldRenderValue={true}
                        isOptionDisabled={(option) => option.isdisabled}
                    />
                    <hr></hr>
                    <label className={"fs-6 fst-italic mt-2"}>Название</label>
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                        placeholder={"Название жанра..."}
                    />
                    <label className={"fs-6 fst-italic mt-2"}>Описание</label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={"Описание..."}
                    />
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"dark"} onClick={handleClose}>Закрыть</Button>
                <Button variant={"dark"} onClick={updateData}>Изменить</Button>
            </Modal.Footer>
        </Modal>
    );
})

export default UpdateGenre;