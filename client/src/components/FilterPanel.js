import Select from "react-select";
import {Button, Col} from "react-bootstrap";
import React, {useContext, useMemo, useState} from "react";
import {Context} from '../index'
import {observer} from "mobx-react-lite"


const FilterPanel = observer(() => {
        const {genre} = useContext(Context)
        const {game} = useContext(Context)
        
        const removeDuplicates = (array, property) => {
            return array.filter((item, index, self) =>
                    index === self.findIndex((t) => (
                        t[property] === item[property]
                    ))
            );
        };

    return (
        <Col md={2}>
            <label className={"fs-6 fst-italic mt-2"}>Жанр</label>
            <Select
                placeholder={"Жанр..."}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={genre.genres.map((gen) => ({
                    value: gen.id,
                    label: gen.name,
                }))}
                onChange={(value)=> 
                    value? game.setSelectedGameGenre(value.value):game.setSelectedGameGenre(null)} //передаем id
                controlShouldRenderValue={true}
                isOptionDisabled={(option) => option.isdisabled}
                isClearable={true} 
            />

            <label className={"fs-6 fst-italic mt-2"}>Количество игроков</label>
            <Select
                placeholder={"Количество..."}
             //   isMulti={true}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={removeDuplicates(game.games, 'players_num').map((gam) => ({
                    value: gam.id,
                    label: gam.players_num,
                }))}
                onChange={(value)=> 
                    value? game.setSelectedPlayersNum(value.label): game.setSelectedPlayersNum(null)} //не айди
                controlShouldRenderValue={true}
                isOptionDisabled={(option) => option.isdisabled}
                isClearable={true} 
            />
            <label className={"fs-6 fst-italic mt-2"}>Возраст</label>
            <Select
                placeholder={"Возраст..."}
            //    isMulti={true}
                closeMenuOnSelect={true}
                hideSelectedOptions={false}
                options={removeDuplicates(game.games, 'age_restriction').map((gam) => ({
                    value: gam.id,
                    label: gam.age_restriction,
                }))}
                
                onChange={(value)=> 
                    value? game.setSelectedAge(value.label):game.setSelectedAge(null) }
                controlShouldRenderValue={true}
                isOptionDisabled={(option) => option.isdisabled}
                isClearable={true}
            />
            
           
        </Col>
    )
        
}
)
export default FilterPanel;
