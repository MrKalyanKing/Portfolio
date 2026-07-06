import projectmodel from "../models/ProjectModel.js";
import imagekit from "../utils/imagekit.js";
import fs from "fs";
import { getCached, refreshCache } from "../utils/cache.js";
import describeError from "../utils/httpError.js";

// add project
const addproject = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { title, description, githublink, previewlink, kind } = req.body;
    let image_file = req.file ? `${req.file.filename}` : null; // Get the uploaded file name

    // Collect tags from request body
    const tags = [];
    for (let i = 0; i < Object.keys(req.body).length; i++) {
      if (req.body[`tags[${i}].name`] && req.body[`tags[${i}].color`]) {
        tags.push({
          name: req.body[`tags[${i}].name`],
          color: req.body[`tags[${i}].color`],
        });
      }
    }

    // Validation check for required fields — name exactly what's missing
    const missing = Object.entries({ title, description, githublink, previewlink, image: image_file })
      .filter(([, v]) => !v)
      .map(([k]) => k);
    if (missing.length > 0) {
      return res.status(400).json({ success: false, message: `Missing required field${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}.` });
    }

    // Upload to ImageKit if configured
    if (imagekit && req.file) {
      try {
        const fileContent = fs.readFileSync(req.file.path);
        const uploadResponse = await imagekit.upload({
          file: fileContent,
          fileName: req.file.filename,
          folder: "/portfolio_projects",
        });
        image_file = uploadResponse.url; // Save the ImageKit URL instead
        // Optional: Clean up local file
        fs.unlinkSync(req.file.path);
      } catch (uploadErr) {
        console.error("ImageKit Upload Error:", uploadErr);
        // Fallback to local filename if upload fails, or return error. We'll fallback.
      }
    } else if (!imagekit && req.file) {
      // If imagekit is not configured, we'll store a complete URL using the local server (assuming it's localhost:3000 for local dev)
      // Actually, since the frontend expects `p.image` to be a full URL, and we just save filename, let's keep it as filename
      // But if imagekit is enabled, image_file is now a URL.
    }

    // Create the project object and save it
    const project = new projectmodel({
      title,
      description,
      tags, // Attach tags
      kind: kind || "FINTECH • BACKEND",
      image: image_file,
      githublink,
      previewlink,
    });
    
    const savedprj = await project.save(); // Save the project to DB
    await refreshCache("project"); // Keep the in-memory cache in sync

    // Send the success response
    res.status(201).json({ success: true, project: savedprj });

  } catch (err) {
    console.error("addproject failed:", err);
    const { status, message } = describeError(err, "save the project");
    res.status(status).json({ success: false, message });
  }
};
  

// feteching 

const projectfetch = async (req, res) => {
  try {
    const projects = await getCached("project"); // Served from RAM, not MongoDB
    res.status(201).json({ success: true, message: "projects fetched", project: projects }); // Corrected to "project"
  } catch (err) {
    console.error("projectfetch failed:", err);
    const { status, message } = describeError(err, "load the projects");
    res.status(status).json({ success: false, message });
  }
};

const deleteproject=async (req,res)=>{
   let {id} =req.params
   try{
     const deletes = await projectmodel.findByIdAndDelete(id)
     if (!deletes) {
       return res.status(404).json({ success: false, message: `No project found with id ${id} — it may already have been deleted.` })
     }
     await refreshCache("project")
     res.status(201).json({success:true,message:"Project was deleted",deletes:deletes})
   } catch(er){
    console.error("deleteproject failed:", er);
    const { status, message } = describeError(er, "delete the project");
    res.status(status).json({ success: false, message });
   }
}

const updateproject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, githublink, previewlink, kind } = req.body;

    let tags = [];
    if (req.body.tags) {
      try {
        tags = typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags;
      } catch (e) {
        tags = [];
      }
    }

    const updateData = { title, description, githublink, previewlink, kind, tags };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await projectmodel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    await refreshCache("project");
    res.status(200).json({ success: true, message: "Project updated successfully", project: updated });
  } catch (err) {
    console.error("updateproject failed:", err);
    const { status, message } = describeError(err, "update the project");
    res.status(status).json({ success: false, message });
  }
};

export { addproject, projectfetch, deleteproject, updateproject };



