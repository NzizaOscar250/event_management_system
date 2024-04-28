export default function Events(data=[],action){
    switch(action.type){
        case 'FETCH_EVENTS':
            return action.payload
        case 'CREATE_EVENT':
            return [...data,action.payload]
        case 'DELETE_EVENT':
            return data.filter((event)=>event._id !== action.payload._id)
        case 'UPDATE_EVENT':
            return data.map((event)=>event._id == action.payload._id? action.payload : event)
        default:
            return data

    }
}