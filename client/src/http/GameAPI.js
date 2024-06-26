﻿import {$authHost,$host} from "./index"
import {jwtDecode} from "jwt-decode"
export const createGame = async (game) =>{
    const {data} = await $authHost.post('api/game',game)
    return data
}
export const fetchGames = async (genreId,players_num,age_restriction,limit,page) =>{
    const {data} = await $host.get('api/game',{params:{
            genreId,players_num,age_restriction,limit,page
        }})
    return data
}
export const fetchOneGame = async (id) =>{
    const {data} = await $host.get('api/game/'+id)
    return data

}
export const updateGame = async (id,game) =>{
    const {data} = await $authHost.put('api/game/'+id,game)
    return data

}
export const deleteGame = async (id) =>{
    const {data} = await $authHost.delete('api/game/'+id)
    return data

}  
    