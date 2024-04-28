import { Navigate } from "react-router-dom"
import auth from "../helper/auth.helper"
const UserProtectedRoutes = ({children})=> {
    if(!auth.isAuthenticated()) return <Navigate to="/user/signin"/>

    return children
}

export default UserProtectedRoutes