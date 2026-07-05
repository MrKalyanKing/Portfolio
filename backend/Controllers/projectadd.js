
import pkg from 'body-parser';
const { json } = pkg;
import projectmodel from "../models/ProjectModel.js";

// add project
const addproject = async (req, res) => {
  try {
    // Destructure the data from the request body
    const { title, description, githublink, previewlink } = req.body;
    const image_file = req.file ? `${req.file.filename}` : null; // Get the uploaded file name
    console.log(req.body); // To check if everything is being passed correctly

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

    // Validation check for required fields
    if (!title || !description  || !githublink || !previewlink || !image_file) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Create the project object and save it
    const project = new projectmodel({
      title,
      description,
      tags, // Attach tags
      image: image_file,
      githublink,
      previewlink,
    });


    
    const savedprj = await project.save(); // Save the project to DB
    console.log(savedprj); // Log the saved project

    // Send the success response
    res.status(201).json({ success: true, project: savedprj });

  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({ success: false, message: "Project not updated", error: err });
  }
};
  

// feteching 

const projectfetch = async (req, res) => {
  try {
    const projects = await projectmodel.find({});
    res.status(201).json({ success: true, message: "projects fetched", project: projects }); // Corrected to "project"
  } catch (err) {
    res.status(400).json({ success: false, message: "failed to get projects" });
  }
};

const deleteproject=async (req,res)=>{
   let {id} =req.params
   console.log("Received Id at backend",id)
   try{
     const deletes = await projectmodel.findByIdAndDelete(id)
     res.status(201).json({success:true,message:"Project was deleted",deletes:deletes})
   } catch(er){
    res.status(500).json({success:true,message:"Project was not deleted"})

   }
}

export { addproject , projectfetch,deleteproject };


