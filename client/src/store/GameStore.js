import {makeAutoObservable} from "mobx";

export default class GameStore{
    constructor() {
        this._games = [
            {id:1, name:'Игра1',age_restriction:'5+',players_num:'2'},
            {id:2, name:'Игра2',age_restriction:'2+',players_num:'2-4'}
        ]
        makeAutoObservable(this) //при изменении переменных перерендерим компоненты
    }
    setGames(games){
        this._games = games
    }
    get games(){
        return this._games
    }
}