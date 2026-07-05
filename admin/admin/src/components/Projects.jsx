import React, { useContext, useEffect, useState } from "react";
import upload from "../assets/upload.jpg";
import { AppContext } from "./Contextprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export function Projects() {
  const url = useContext(AppContext);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [project, setProject] = useState([]);
  const [loading, setLodaing] = useState(true);
  const [data, setData] = useState({
    title: "",
    description: "",
    githublink: "",
    previewlink: "",
  });

  // Handle changes for form fields
  
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleErr = () => {
    toast.error("Project is not saved!", {
      position: "bottom-right",
      autoClose: 2000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleErrdelete = () => {
    toast.error("Project is not saved!", {
      position: "bottom-right",
      autoClose: 2000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSucess = () => {
    toast.success("project added succcesfully!", {
      position: "bottom-right",
      autoClose: 2000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleSucessdelete = () => {
    toast.success("project added succcesfully!", {
      position: "bottom-right",
      autoClose: 2000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Handle adding a tech stack
  const handleTagAdd = () => {
    const techName = document.getElementById("tech-name").value;
    const color = document.getElementById("tech-color").value;

    if (techName.trim() && color) {
      setTags([
        ...tags,
        {
          id: Date.now(), // Unique ID for the tag
          name: techName,
          color: color,
        },
      ]);
      document.getElementById("tech-name").value = ""; // Clear input field after adding the tag
      document.getElementById("tech-color").value = "#000000"; // Clear color picker
    }
  };

  // Handle tag removal
  const handleTagRemove = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const projectData = {
  //     ...data,
  //     tags: tags,  // Include tags array in the data
  //     image, // Include the selected image if needed
  //   };

  //   console.log(projectData);  // For debugging, send this to the backend here
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append basic project fields
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("githublink", data.githublink);
    formData.append("previewlink", data.previewlink);

    // Append tags (tech stack) as JSON string (to handle array of objects)
    formData.append("tags", JSON.stringify(tags)); // Convert tags to JSON

    // Append the image file (if available)
    if (image) {
      formData.append("image", image);
    }
   
    try {
      // Send the FormData to the backend via axios (POST request)
      const response = await axios.post(
        `http://localhost:3000/api/project`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending files
          },
        }
      );
      handleSucess();
      if (response.data.success) {
        console.log("Project saved successfully!");
      } else {
        console.log("Failed to save project.");
        handleErr();
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      handleErr();
    }
  };

  // fetching the data

  const projectfethc = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/show/project'
      );
     
      if (response.data.success && Array.isArray(response.data.project)) {
        setProject(response.data.project);
        
      } else {
        handleErr();
      }
    } catch (err) {
      handleErr();
      console.log("data was not fetched ");
      setLodaing(false);
    }
  };
  // deleting the data
   
  const deleteproject=async (id)=>{
    try{
     const response = await fetch(`http://localhost:3000/api/delete/project/${id}`,
     { "method": "DELETE" })

     const result =await response.json()
     if (result.success) {
      handleSucessdelete()
      setProject((prevReports) => prevReports.filter((report) => report._id !== id));
    } else {
      alert(`Error: ${result.message}`);
      handleErrdelete()
    }
    }catch(err){
      console.error(err);
    }
  }
  useEffect(() => {
    projectfethc();
  }, []);
  
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-purple-600">Add Project</h1>
        <p className="text-gray-600">ADMIN PANEL</p>
      </div>
      <div className="bg-white rounded-xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter small title"
              value={data.title}
              onChange={handleChange}
              name="title"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Tags (Tech Stack)
            </label>
            <input
              type="text"
              id="tech-name"
              placeholder="Enter tech stack name (e.g., React)"
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <input
              type="color"
              id="tech-color"
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={handleTagAdd}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              Add Tech Stack
            </button>
            <div className="mt-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-1 mr-2 mb-2 text-sm font-medium text-white rounded-full"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag.id)}
                    className="ml-2 text-white"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              GitHub Link
            </label>
            <input
              type="url"
              placeholder="Enter Github link"
              name="githublink"
              value={data.githublink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project Live Preview Link
            </label>
            <input
              type="url"
              placeholder="Enter project URL"
              name="previewlink"
              value={data.previewlink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="description">
            <label>Description</label>
            <br></br>
            <textarea
              name="description"
              rows="9"
              cols="50"
              value={data.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project Images (first image will be shown as thumbnail)
              <img
                src={image ? URL.createObjectURL(image) : upload}
                alt="upload"
                style={{ height: "90px", width: "140px" }}
              />
            </label>
            <input
              type="file"
              id="project-images"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Save Project
          </button>
        </form>
      </div>

      {/* fetching the data */}

      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-blue-600 mt-8">
          Project Page {project.length}
        </h2>
        <div className="bg-white shadow-lg rounded-lg mt-6 w-full max-w-4xl p-6">
          {project.length === 0 ? (
            <p className="text-center text-gray-500">No Project available.</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    TItle
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Image
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    PreviewLink
                  </th>
                  <td className="border border-gray-300 px-4 py-2">Delete</td>
                </tr>
              </thead>
              <tbody>
                {project.map((Projects) => (
                  <tr key={Projects._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {Projects.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img src={project.image} alt="image" style={{ maxWidth: '100%', height: 'auto' }} />
                    </td>
                    <td
                      className="border border-gray-300 px-4 py-2"
                      style={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {" "}
                      {Projects.description}{" "}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {" "}
                      <a
                        href={Projects.previewlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "blue" }}
                      >
                        {" "}
                        {Projects.previewlink}
                      </a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => deleteproject(Projects._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <ToastContainer />
      </div>

      {/* closing the detched data  */}
    </div>
  );
}
