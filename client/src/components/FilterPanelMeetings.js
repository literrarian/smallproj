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
                <h6>Возраст</h6>
                <Select
                    placeholder={"Возраст..."}
                    //   isMulti={true}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}
                    options={removeDuplicates(meeting.meetings, 'age_restriction').map((gen) => ({
                        value: gen.id,
                        label: gen.age_restriction,
                    }))}
                    onChange={(value)=> meeting.setSelectedGenre(value.value)} //передаем id
                    controlShouldRenderValue={true}
                    isOptionDisabled={(option) => option.isdisabled}
                />

                <h6>Количество слотов</h6>
                <Select
                    placeholder={"Количество..."}
                    //   isMulti={true}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}

                    options={removeDuplicates(meeting.meetings, 'slots_num').map((gen) => ({
                        value: gen.id,
                        label: gen.slots_num,
                    }))}
                    onChange={(value)=> meeting.setSelectedPlayersNum(value.label)} //не айди
                    controlShouldRenderValue={true}
                    isOptionDisabled={(option) => option.isdisabled}
                />
                <h6>Игра</h6>
                <Select
                    placeholder={"Игра..."}
                    //    isMulti={true}
                    closeMenuOnSelect={true}
                    hideSelectedOptions={false}
                    options={game.games.map((gam) => ({
                        value: gam.id,
                        label: gam.name,
                    }))}
                    onChange={(value)=> game.setSelectedAge(value.id)}
                    controlShouldRenderValue={true}
                    isOptionDisabled={(option) => option.isdisabled}
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
