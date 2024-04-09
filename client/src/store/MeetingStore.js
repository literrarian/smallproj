import {makeAutoObservable} from "mobx";

export default class MeetingStore{
    constructor() {
        this._meetings = [
            {id:1, name:'Встреча1',description:'Описание1',age_restriction:'4+',slots_num:'3',m_date:'09.04.2024',game_id:'1'},
            {id:2, name:'Встреча2',description:'Описание2',age_restriction:'10+',slots_num:'6',m_date:'09.04.2024',game_id:'2'}
        ]
        makeAutoObservable(this) //при изменении переменных перерендерим компоненты
    }
    setMeetings(meetings){
        this._meetings = meetings
    }
    get meetings(){
        return this._meetings
    }
}