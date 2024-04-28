import { jwtDecode } from "jwt-decode"

const auth = {
  isAuthenticated() {
    if (typeof window == "undefined" || sessionStorage.getItem('jwt') == 'undefined')
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  userDetails(){
   return this.isAuthenticated()?.user
  },
  userInfo(){
    if (typeof window == "undefined")
    return false

      if (!this.isAuthenticated()) return false;
        const userId = jwtDecode(this.isAuthenticated().token)._id
        
        return userId      
  },
 
  isAdmin(){
    if (typeof window == "undefined")
      return false
    if(this.isAuthenticated()){
      const dt = JSON.parse(sessionStorage.getItem('jwt'))
      if (dt.user.admin) return true
      return dt.user.admin;
    }
    return false
    
  },
  authenticate(jwt) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    
  },
  clearJWT() {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    window.location.reload()
    
      
  },
  
}

export default auth