import ExpereinceModel from "../models/Expereince.js"
import mongoose from "mongoose";
import { getCached, refreshCache } from "../utils/cache.js";
import describeError from "../utils/httpError.js";
const addexpereince= async(req,res)=>{
  try{
  let {role,company,description,duration,location,techStack}=req.body
  const image_file = req.file ? `${req.file.filename}` : null;
  console.log(req.body)
  
  // Parse arrays if they are sent as strings
  if (typeof description === 'string') {
    try { description = JSON.parse(description); } catch(e) {}
  }
  if (typeof techStack === 'string') {
    try { techStack = JSON.parse(techStack); } catch(e) {}
  }

  const work =new ExpereinceModel ({
    role:role,
    image:image_file,
    company:company,
    location:location,
    description:description,
    duration:duration,
    techStack:techStack
  })

  const savedwork= await work.save();
  await refreshCache("work");

  res.status(201).json({success:true,Expereince:"Experince is saved",savedwork})
}catch(err){
  console.error("addexpereince failed:", err);
  const { status, message } = describeError(err, "save the work experience");
  res.status(status).json({ success: false, message });
}
}

// feteching experince

 const workfetch= async (req,res)=>{
  try{
   const work = await getCached("work") // Served from RAM, not MongoDB
   res.status(201).json({success:true,message:"Experince fetched",work:work})
  }catch(err){
   console.error("workfetch failed:", err);
   const { status, message } = describeError(err, "load the work experience");
   res.status(status).json({ success: false, message });
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

    await refreshCache("work");
    return res.json({ success: true, message: 'Experience Removed' });
  } catch (err) {
    console.error('Error deleting experience:', err);
    const { status, message } = describeError(err, "delete the work experience");
    return res.status(status).json({ success: false, message });
  }
};

 
const updateexperience = async (req, res) => {
  try {
    const { id } = req.params;
    let { role, company, description, duration, location, techStack } = req.body;

    if (typeof description === 'string') {
      try { description = JSON.parse(description); } catch(e) {}
    }
    if (typeof techStack === 'string') {
      try { techStack = JSON.parse(techStack); } catch(e) {}
    }

    const updateData = { role, company, description, duration, location, techStack };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await ExpereinceModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Experience record not found" });
    }

    await refreshCache("work");
    return res.status(200).json({ success: true, message: "Experience updated successfully", Expereince: updated });
  } catch (err) {
    console.error("updateexperience failed:", err);
    const { status, message } = describeError(err, "update the work experience");
    return res.status(status).json({ success: false, message });
  }
};

export { addexpereince, workfetch, deletework, updateexperience };