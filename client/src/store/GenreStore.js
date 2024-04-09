import {makeAutoObservable} from "mobx";

export default class GenreStore{
    constructor() {
        this._genres = [
            {id:1, name:'Жанр1',description:'Описание1'},
            {id:2, name:'Жанр2',description:'Описание2'}
        ]
        makeAutoObservable(this) //при изменении переменных перерендерим компоненты
    }
    setGenres(genres){
        this._genres = genres
    }
    get genres(){
        return this._genres
    }
}