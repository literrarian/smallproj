import Select from "react-select";
import {Button, Col} from "react-bootstrap";
import React, {useContext, useState} from "react";
import {Context} from '../index'
import {observer} from "mobx-react-lite"
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from '../utils/consts'
import CreateMeeting from './/modals/CreateMeeting'

const FilterPanelMeeting = observer(() => {
    const {meeting} = useContext(Context)
    const {game} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [meetingVisible,setMeetingVisible] = useState(false)

    const removeDuplicates = (array, property) => {
        return array.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t[property] === item[property]
                ))
        );
    };
        return (
            <Col md={2}>
                <label className={"fs-6 fst-italic mt-2"}>Возраст</label>
                <Select
                    placeholder={"Возраст..."}
                    //   isMulti={true}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}
                    options={removeDuplicates(meeting.meetings, 'age_restriction').map((gen) => ({
                        value: gen.id,
                        label: gen.age_restriction,
                    }))}
                    onChange={(value)=> 
                        value? meeting.setAgeRestriction(value.label) :meeting.setAgeRestriction(null) } //передаем id
                    controlShouldRenderValue={true}
                    isOptionDisabled={(option) => option.isdisabled}
                    isClearable={true}
                />

                <label className={"fs-6 fst-italic mt-2"}>Слоты</label>
                <Select
                    placeholder={"Количество..."}
                    //   isMulti={true}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}

                    options={removeDuplicates(meeting.meetings, 'slots_num').map((gen) => ({
                        value: gen.id,
                        label: gen.slots_num,
                    }))}
                    onChange={(value)=> 
                        value? meeting.setSlotsNum(value.label): meeting.setSlotsNum(null) } //не айди
                    controlShouldRenderValue={true}
                    isOptionDisabled={(option) => option.isdisabled}
                    isClearable={true}
                />
                <label className={"fs-6 fst-italic mt-2"}>Игра</label>
                <Select
                    placeholder={"Игра..."}
                    //    isMulti={true}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}
                    options={game.games.map((gam) => ({
                        value: gam.id,
                        label: gam.name,
                    }))}
                    onChange={(value)=> 
                        value? meeting.setGameId(value.value):meeting.setGameId(null)}
                    controlShouldRenderValue={true}
                    isOptionDisabled={(option) => option.isdisabled}
                    isClearable={true}
                />
                {user.isAuth?
                    <Button variant={"dark"} className={"mt-4"} onClick={()=> setMeetingVisible(true)}>
                        Создать свою встречу
                    </Button>
                    :
                    <Button variant={"dark"} className={"mt-4"} onClick={()=> navigate(LOGIN_ROUTE)}>Войти</Button>
                }
                <CreateMeeting show={meetingVisible} onHide={()=> setMeetingVisible(false)}/>
            </Col>
        )

    }
)
export default FilterPanelMeeting;
