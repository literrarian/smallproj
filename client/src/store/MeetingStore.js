import {makeAutoObservable} from "mobx";

export default class MeetingStore{
    constructor() {
        this._meetings = []

        this._page = 1
        this._totalCount = 0
        this._limit = 3
        
        this._ageRestriction={}
        this._slotsNum={}
        this._gameId={}
        
        makeAutoObservable(this) //при изменении переменных перерендерим компоненты
    }
    setAgeRestriction(age){
        this._ageRestriction = age
    }
    setSlotsNum(slots){
        this._slotsNum = slots 
    }
    setGameId(id){
        this._gameId = id 
    }
    get ageRestriction(){
        return  this._ageRestriction
    }
    
    get slotsNum(){
        return  this._slotsNum 
    }

    get gameId(){
        return  this._gameId 
    }
    setMeetings(meetings){
        this._meetings = meetings
    }
    setPage(page){
        this._page = page
    }
    setTotalCount(count){
        this._totalCount = count
    }
    setLimit(limit){
        this._limit = limit
    }
    get meetings(){
        return this._meetings
    }
    get totalCount(){
        return  this._totalCount //может тут нужен массив
    }
    get limit(){
        return  this._limit //может тут нужен массив
    }
    get page(){
        return  this._page //может тут нужен массив
    }
}