import {makeAutoObservable} from "mobx";

export default class GameStore{
    constructor() {
        this._games = []
        
        this._selectedAge = {} //для фильтров
        this._selectedPlayersNum = {}
        this._selectedGameGenre={}
        
        //this._selectedGame = {}
        
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this) //при изменении переменных перерендерим компоненты
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
    setGames(games){
        this._games = games
    }
    get games(){
        return this._games
    }
    setSelectedGameGenre(genre){
        this._selectedGameGenre = genre
    }
    // setSelectedGame(game){
    //     this._selectedGame = game 
    // }
    // get selectedGame(){
    //     return  this._selectedGame 
    // }
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
    
    get selectedGameGenre(){
        return  this._selectedGameGenre //может тут нужен массив
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