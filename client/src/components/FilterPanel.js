import Select from "react-select";
import {Button, Col} from "react-bootstrap";
import React, {useContext} from "react";
import {Context} from '../index'
import {observer} from "mobx-react-lite"


const FilterPanel = observer(() => {
    const {genre} = useContext(Context)
    const {game} = useContext(Context)
    
    return (
        <Col md={2}>
            <h6>Жанры</h6>
            <Select
                placeholder={"Жанр..."}
             //   isMulti={true}
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
            
            <h6>Количество игроков</h6>
            <Select
                placeholder={"Количество..."}
             //   isMulti={true}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={game.games.map((gam) => ({
                    value: gam.id,
                    label: gam.players_num,
                }))}
                onChange={(value)=> game.setSelectedPlayersNum(value.label)} //не айди
                controlShouldRenderValue={true}
                isOptionDisabled={(option) => option.isdisabled}
            />
            <h6>Возраст</h6>
            <Select
                placeholder={"Возраст..."}
            //    isMulti={true}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={game.games.map((gam) => ({
                    value: gam.id,
                    label: gam.age_restriction,
                }))}
                onChange={(value)=> game.setSelectedAge(value.label)}
                controlShouldRenderValue={true}
                isOptionDisabled={(option) => option.isdisabled}
            />
           
        </Col>
    )
        
}
)
export default FilterPanel;
