export default function Bookings(data=[],action){
    switch(action.type){
        case 'FETCH_BOOKINGS':
            return action.payload
        case 'CREATE_BOOKING':
            return [...data,action.payload]
        case 'REMOVE_BOOKINGS':
          
            return data.filter((event)=>event._id !== action.payload.event)
        default:
            return data

    }
}