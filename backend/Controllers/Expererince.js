import ExpereinceModel from "../models/Expereince.js"
import mongoose from "mongoose";
const addexpereince= async(req,res)=>{
  try{
  const {role,image,company,description,duration}=req.body
  const image_file = req.file ? `${req.file.filename}` : null;
  console.log(req.body)

  const work =new ExpereinceModel ({
    role:role,
    image:image_file,
    company:company,
    description:description,
    duration:duration
  })

  const savedwork= await work.save();

  res.status(201).json({success:true,Expereince:"Experince is saved",savedwork})
}catch(err){
  res.status(500).json({success:false,message:'Expereince of work is not saved',err})
}
}

// feteching experince

 const workfetch= async (req,res)=>{
  try{
   const work = await ExpereinceModel.find({})
   res.status(201).json({success:true,message:"Experince fetched",work:work})
  }catch(err){
   res.status(500).json({success:false,message:"failed to fetch"})
  }

 }

 const deletework = async (req, res) => {
  const { id } = req.params;
  

  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    // Delete the document by ID
    const workdel = await ExpereinceModel.findByIdAndDelete(id); // Pass ID directly
    if (!workdel) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

  
    return res.json({ success: true, message: 'Experience Removed' });
  } catch (err) {
    console.error('Error deleting experience:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

 
export { addexpereince,workfetch,deletework}