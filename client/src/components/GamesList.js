import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Image, Row, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {GAME_ROUTE} from  '../utils/consts'


const GamesList = observer(() => {
    const {game} = useContext(Context)
    const navigate = useNavigate()
    return (
        
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Название</th>
                <th>Коробка</th>
                <th>Жанр</th>
                <th>Возрастное ограничение</th>
                <th>Количество игроков</th>
            </tr>
            </thead>
            <tbody>
            {game.games.map((gameItem, index) => (
                <tr key={index} onClick={() => navigate(GAME_ROUTE + '/' + gameItem.id)}>
                    <td>{gameItem.name}</td>
                    <td> <Image width={80} height={80} src = {gameItem.img}/></td>
                    <td>{gameItem.genre}</td>
                    <td>{gameItem.age_restriction}</td>
                    <td>{gameItem.players_num}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
});

export default GamesList;