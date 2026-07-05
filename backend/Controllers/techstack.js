import techModel from "../models/TechStack.js";
import { getCached, refreshCache } from "../utils/cache.js";
import describeError from "../utils/httpError.js";

// Assuming you are using multer for file uploads
const techstack = async (req, res) => {
    try {
        const image_file = req.file ? `${req.file.filename}` : null; // Get the uploaded file's filename
        if (!image_file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }
      
        // Creating a new techstack entry with the image
        const stack = new techModel({
            icon: image_file, // Saving the filename in the icon field
        });

        const savedstack = await stack.save();
        await refreshCache("tech");
        res.status(201).json({ success: true, techstack: "created stack", savedstack });

    } catch (err) {
        console.error("techstack failed:", err);
        const { status, message } = describeError(err, "save the tech stack image");
        res.status(status).json({ success: false, message });
    }
};
  //feteching

  const techfetch=async (req,res) =>{
    try{
    const tech= await getCached("tech") // Served from RAM, not MongoDB
    res.status(201).json({success:true,message:"Tech stack feteched",tech:tech})
    }catch(err){
        console.error("techfetch failed:", err);
        const { status, message } = describeError(err, "load the tech stack");
        res.status(status).json({ success: false, message });
    }

  }
export {techfetch ,techstack};
