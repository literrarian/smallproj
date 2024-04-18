import {makeAutoObservable} from "mobx";

export default class MeetingStore{
    constructor() {
        this._meetings = []
        makeAutoObservable(this) //при изменении переменных перерендерим компоненты
    }
    setMeetings(meetings){
        this._meetings = meetings
    }
    get meetings(){
        return this._meetings
    }
}