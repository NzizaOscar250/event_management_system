import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import UserModel from "../../models/Users.model.js"
import dotenv from "dotenv"


dotenv.config();


const secret=process.env.AUTH_SECRET_KEY;

    
export const signin=async(req,res)=>{
    const data=req.body;
    try {
        
        const userExist = await UserModel.findOne({email:data.email})
        if(!userExist) return res.status(401).json({message:'Email Not Found!'})

        if(!userExist.authenticate(data.password)) return res.status(401).json({message: 'Incorrect Password'})

        const token = jwt.sign({_id:userExist._id,email:userExist.email,admin:userExist.admin},secret,{expiresIn:'24h' })


        res.cookie('remember_me', token, { expire: new Date() + 9999 })
     return   res.status(200).json({success:"userfound",token,user:{
            username:userExist.username,
            email:userExist.email,
            admin:userExist.admin

        }})

    } catch (error) {
        return res.status({error:error.message})
    }

}


export const signout = (req,res)=>{
    res.clearCookie("remember_me")
 return res.status(200).json({
 message: "signed out"
 })
}

export const empSignup=async(req,res)=>{
    // # Authorization: token xxx

    try{
        const {username,email,password}=req.body;
        //check if user alreasdy exist

        let isAdmin = false
        if(username == 'Admin' || username == 'admin'){
            isAdmin = true
        }
           

              const validate = username == undefined  || email == undefined || password == undefined
 
        if(validate) return res.json({error:'all field are required'})

        let userExist=await UserModel.findOne({username});
        //does username already Exist
        if(userExist) return  res.status(404).json({message:"Username already taken...!"});
         userExist=await UserModel.findOne({email});
        //  does email already exist
        if(userExist)return res.status(404).json({message:"Email already taken...!"});
        //hash password

        const result=await UserModel.create({
            username:username,
            password:password,
            email:email,
            admin:isAdmin
        });

        //generate token
        const token = jwt.sign({_id:result._id,email:result.email},
            secret,{expiresIn:'24h' })

            return res.status(200).json({success:"user signed up",token,user:{
                _id:result._id,
                username:result.username,
                email:result.email,
                admin:result.admin
    
            }})

    }
    catch(e){
        console.log(e.message)

    }
    
}