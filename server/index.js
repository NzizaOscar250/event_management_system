import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authroutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import eventsRoutes from "./routes/events.routes.js"
import bookingRoutes from "./routes/bookings.routes.js"

dotenv.config();
export const app = express()
const PORT = process.env.PORT || 8080
const Url = process.env.DB 
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors())

app.use("/api/auth/",authroutes)
app.use("/api/user/",userRoutes)
app.use("/api/events/",eventsRoutes)
app.use("/api/booking/",bookingRoutes)

mongoose.connect(Url).then(()=>{
  app.listen(PORT, ()=>{
      console.log("App is listening to http://localhost:", PORT)
  })
    
}).catch((e)=>console.log("error: ",e.message));
// Export the handler for Netlify
