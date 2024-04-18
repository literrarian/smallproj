import {$authHost,$host} from "./index"
import {jwtDecode} from "jwt-decode"
export const createGame = async (game) =>{
    const {data} = await $authHost.post('api/game',game)
    return data
}
export const fetchGames = async () =>{
    const {data} = await $host.get('api/game')
    return data
}
export const fetchOneGame = async (id) =>{
    const {data} = await $host.get('api/game/'+id)
    return data

}
export const updateGame = async (id) =>{
    const {data} = await $authHost.put('api/game/'+id)
    return data

}
export const deleteGame = async (id) =>{
    const {data} = await $authHost.delete('api/game/'+id)
    return data

}  
    