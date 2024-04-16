import {makeAutoObservable} from "mobx";

export default class GameStore{
    constructor() {
        this._games = [
            {id:1, name:'Игра1',age_restriction:'5+',players_num:'2', img:'https://steamuserimages-a.akamaihd.net/ugc/5088536233466642530/35D9F1EF85BA81DFB7F091E2AFF156F9C703CDC6/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'},
            {id:2, name:'Игра2',age_restriction:'2+',players_num:'2-4', img:'https://steamuserimages-a.akamaihd.net/ugc/5088536233466642530/35D9F1EF85BA81DFB7F091E2AFF156F9C703CDC6/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'}
        ]
        this._selectedAge = {}
        this._selectedPlayersNum = {}
        makeAutoObservable(this) //при изменении переменных перерендерим компоненты
    }
    setGames(games){
        this._games = games
    }
    get games(){
        return this._games
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
}