import skillmodel from "../models/skills.js";
import { getCached, refreshCache } from "../utils/cache.js";
import describeError from "../utils/httpError.js";


const skilladd=async(req,res)=>{
    try{
    const { title }=req.body;
    const image_file = req.file ? `${req.file.filename}` : null;
    
 
     let skill= new skillmodel({
        title:title,
        image:image_file
     })

     const addskill= await skill.save()
     await refreshCache("skill")
     res.status(201).json({success:true,message:"skill is saved",addskill})
   }catch(err){
    console.error("skilladd failed:", err);
    const { status, message } = describeError(err, "save the skill");
    res.status(status).json({ success: false, message });
   }
}

//fetching

const fetchskill=async(req,res)=>{
    try{
     const find =await getCached("skill") // Served from RAM, not MongoDB
     res.status(201).json({success:true,message:"Skill are fetched",find:find})
    }catch(err){
        console.error("fetchskill failed:", err);
        const { status, message } = describeError(err, "load the skills");
        res.status(status).json({ success: false, message });
    }
}


export {skilladd,fetchskill}