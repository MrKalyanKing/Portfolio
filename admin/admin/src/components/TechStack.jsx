import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "./Contextprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TechStack = () => {
  const { url } = useContext(AppContext); // Ensure context is correctly used
  const [techImage, setTechImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTechImage(URL.createObjectURL(file)); // For preview only
    }
  };

  const handleErr = () => {
    toast.error("Project is not saved!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSuccess = () => {
    toast.success("Project added successfully!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      const response = await axios.post(`${url}/techstack`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        handleSuccess();
      } else {
        handleErr();
        console.log("Backend Error Message:", response.data.message);
      }
    } catch (err) {
      handleErr();
      if (err.response) {
        console.log("Backend Error Details:", err.response.data);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
            Tech Stack
          </h2>

          <div className="flex justify-center mb-4">
            <img
              src={techImage || "https://via.placeholder.com/150"}
              alt="Tech Stack"
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="tech-image"
              className="block text-gray-700 text-lg font-medium text-center"
            >
              Upload Tech Image
            </label>
            <input
              type="file"
              id="tech-image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full mt-2 p-2 border-2 border-gray-300 rounded-lg"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TechStack;
