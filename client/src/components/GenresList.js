import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row, Table} from "react-bootstrap";
import {GENRE_ROUTE} from  '../utils/consts'


const GenreList = observer(() => {
    const {genre} = useContext(Context)
    return (

        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Название</th>
                <th>Описание</th>
            </tr>
            </thead>
            <tbody>
            {genre.genres.map((genreItem, index) => (
                <tr key={index} >
                    <td>{genreItem.name}</td>
                    <td>{genreItem.description}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
});

export default GenreList;