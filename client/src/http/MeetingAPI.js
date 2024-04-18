import {$authHost,$host} from "./index"
import {jwtDecode} from "jwt-decode"
export const createMeeting = async (meeting) =>{
    const {data} = await $authHost.post('api/meeting',meeting)
    return data
}
export const fetchMeetings = async () =>{
    const {data} = await $host.get('api/meeting')
    return data
}
export const fetchOneMeeting = async (id) =>{
    const {data} = await $host.get('api/meeting/'+id)
    return data

}
export const updateMeeting = async (id) =>{
    const {data} = await $authHost.put('api/meeting/'+id)
    return data

}
export const deleteMeeting = async (id) =>{
    const {data} = await $authHost.delete('api/meeting/'+id)
    return data

}    