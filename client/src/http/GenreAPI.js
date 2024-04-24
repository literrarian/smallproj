import {$authHost,$host} from "./index"
import {jwtDecode} from "jwt-decode"
export const createGenre = async (genre) =>{
    const {data} = await $authHost.post('api/genre',genre)
    return data
}
export const fetchGenres = async () =>{
    const {data} = await $host.get('api/genre')
    return data
}
export const getGenreCount = async () =>{
    const {data} = await $host.get('api/genre/stat')
    return data
}
export const fetchOneGenre = async (id) =>{
    const {data} = await $authHost.get('api/genre/'+id)
    return data

}
export const updateGenre = async (id,genre) =>{
    const {data} = await $authHost.put('api/genre/'+id,genre)
    return data

}


    