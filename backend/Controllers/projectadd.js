import projectmodel from "../models/ProjectModel.js";
import imagekit from "../utils/imagekit.js";
import fs from "fs";
import { getCached, refreshCache } from "../utils/cache.js";
import describeError from "../utils/httpError.js";

// Upload a multer file to ImageKit and return its hosted URL. Falls back to
// the local filename if ImageKit is unconfigured or the upload fails — but a
// filename only renders on the server that stored the file, so ImageKit is
// what makes images visible from every environment.
const uploadImage = async (file) => {
  if (!file) return null;
  if (!imagekit) return file.filename;
  try {
    const fileContent = fs.readFileSync(file.path);
    const uploadResponse = await imagekit.upload({
      file: fileContent,
      fileName: file.filename,
      folder: "/portfolio_projects",
    });
    fs.unlinkSync(file.path); // Clean up the local copy
    return uploadResponse.url;
  } catch (uploadErr) {
    console.error("ImageKit Upload Error:", uploadErr);
    return file.filename;
  }
};

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

    // Upload to ImageKit if configured (falls back to the local filename)
    if (req.file) {
      image_file = await uploadImage(req.file);
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
      // Same ImageKit path as addproject — storing just the filename made the
      // image visible only on the server that received the upload.
      updateData.image = await uploadImage(req.file);
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



