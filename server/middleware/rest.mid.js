export const isAdmin = (req,res,next)=>{
    const isAdmin = req.profile &&  req.profile.admin
    console.log(req.profile)
    if(!isAdmin){
        return res.status(403).json({error:'You are not an Admin',dt:req.profile})

    }
    next()
}



export const isMyEvent =  (req,res,next)=>{
    const isMycourse =  req.course && req.userId && req.course.instructor._id == req.userId
    if(isMycourse ) return res.status(403).json({error:'You can not modify this Event'})
    next()
 }




