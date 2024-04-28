import {RouterProvider,createBrowserRouter,Route,createRoutesFromElements, Outlet} from "react-router-dom"
import './App.css'
import {lazy,Suspense} from 'react'
import LoaderOverlay from "./components/LoaderOverlay"
import RootLayout from "./layout/RootLayout"
import Error from "./components/Error"
import Event from "./views/events/Event"
import Mydashboard from "./users/Mydashboard"
import AdminProtectedRoutes from "./layout/AdminProtectedRoutes"
import UserProtectedRoutes from "./layout/UserProtectedRoutes"
const HomePage = lazy(()=>import("./views/HomePage"))
const LoginForm = lazy(()=>import("./admin/LoginForm"))
const Dashboard = lazy (()=>import("./admin/Dashboard"))
const OurEvents = lazy (()=>import("./admin/OurEvents"))
const NotFound = lazy (()=>import("./views/NotFound"))
const CreateEvents = lazy(()=>import("./admin/CreateEvents"))
const EditEvents = lazy(()=>import("./admin/EditEvents"))
const UserLoginForm = lazy(()=>import("./users/LoginForm"))
const UserSignupForm = lazy(()=>import("./users/SignupForm"))
const Layout = ()=>(<><Outlet/></>)
function App() {

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
         <Route path="home" element={<RootLayout/>} errorElement={<Error/>}>
          <Route index element={ <Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><HomePage/></Suspense> }/>
          <Route path="events">
               <Route path=":eventId" element={<Event/>}/>
               <Route path="*" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><NotFound/></Suspense>}/>
                  
          </Route>
          <Route path="user/dashboard" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}>  <UserProtectedRoutes><Mydashboard/></UserProtectedRoutes> </Suspense>}/>
          <Route path="*" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><NotFound/></Suspense>}/>
                  
        </Route>
          
          <Route path="user" element={<Layout/>}>
         
          <Route path="signin" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}>  <UserLoginForm/> </Suspense>}/>
         
          <Route path="signup" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}>  <UserSignupForm/> </Suspense>}/>
          <Route path="*" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><NotFound/></Suspense>}/>
                  
          </Route>
          <Route path="admin" element={<Layout/>}>
              <Route path="signin" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}>  <LoginForm/> </Suspense>}/>
              
              <Route path="dashboard" element={ <Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}> <AdminProtectedRoutes><Dashboard/></AdminProtectedRoutes> </Suspense>}>
                
                  <Route index element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><OurEvents/></Suspense>}/>
                  <Route path="events" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><OurEvents/></Suspense>}/>
                  
                  
                  <Route path="create" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><CreateEvents/></Suspense>}/>
                  <Route path="events/:eventId/edit" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><EditEvents/></Suspense>}/>
                  <Route path="events/:eventId" element={<Event/>}/>
                  <Route path="*" element={<Suspense fallback={<LoaderOverlay  loading={true} title="POWERED BY ETITE LTD"/>}><NotFound/></Suspense>}/>
                  
              </Route>

          </Route>
      </Route>
    )
  )



  return (
    <RouterProvider router={routes}/>
  )
}

export default App
