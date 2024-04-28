
import auth from '../helper/auth.helper'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoutes = ({children}) => {
  
    if(!auth.isAuthenticated() || !auth.isAdmin()) return <Navigate to="/admin/signin"/>
    
    return children
}

export default AdminProtectedRoutes