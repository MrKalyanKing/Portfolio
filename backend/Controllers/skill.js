import skillmodel from "../models/skills.js";


const skilladd=async(req,res)=>{
    try{
    const { title }=req.body;
    const image_file = req.file ? `${req.file.filename}` : null;
    
 
     let skill= new skillmodel({
        title:title,
        image:image_file
     })

     const addskill= await skill.save()
     res.status(201).json({success:true,message:"skill is saved",addskill})
   }catch(err){
    res.status(500).json({success:false,message:"skill is not saved"})
   } 
}

//fetching

const fetchskill=async(req,res)=>{
    try{
     const find =await new skillmodel.find({})
     res.status(201).json({success:true,message:"Skill are fetched",find:find})
     console.log(find)
    }catch(err){
        res.status(201).json({success:true,message:"Skill are fetched"})
    }
}


export {skilladd,fetchskill}