import techModel from "../models/TechStack.js";

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
        res.status(201).json({ success: true, techstack: "created stack", savedstack });

    } catch (err) {
        res.status(500).json({ success: false, message: "Techstack is not created", err });
    }
};
  //feteching

  const techfetch=async (req,res) =>{
    try{
    const tech= await techModel.find({})
    res.status(201).json({success:true,message:"Tech stack feteched",tech:tech})
    }catch(err){
        res.status(500).json({success:false,message:"Tech stack not feteched"})
    }

  }
export {techfetch ,techstack};
