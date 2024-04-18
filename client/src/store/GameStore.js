import {makeAutoObservable} from "mobx";

export default class GameStore{
    constructor() {
        this._games = []
        this._selectedAge = {}
        this._selectedPlayersNum = {}
        this._selectedGame = {}
        this._selectedGameGenre={}
        makeAutoObservable(this) //при изменении переменных перерендерим компоненты
    }
    setGames(games){
        this._games = games
    }
    get games(){
        return this._games
    }
    setSelectedGameGenre(genre){
        this._selectedGameGenre = genre
    }
    setSelectedGame(game){
        this._selectedGame = game //может тут нужен массив
    }
    setSelectedAge(selectedAge){
        this._selectedAge = selectedAge //может тут нужен массив
    }
    get selectedAge(){
        return  this._selectedAge //может тут нужен массив
    }
    setSelectedPlayersNum(selectedPlayersNum){
        this._selectedPlayersNum = selectedPlayersNum //может тут нужен массив
    }
    get selectedPlayersNum(){
        return  this._selectedPlayersNum //может тут нужен массив
    }
    get selectedGame(){
        return  this._selectedGame //может тут нужен массив
    }
    get selectedGameGenre(){
        return  this._selectedGameGenre //может тут нужен массив
    }
}