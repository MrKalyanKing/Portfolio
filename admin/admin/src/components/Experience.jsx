import React, { useContext, useState, useEffect } from "react";
import upload from "../assets/upload.jpg";
import axios from "axios";
import { AppContext } from "./Contextprovider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Experience = () => {
  const { url } = useContext(AppContext);

  const [image, setImage] = useState(null);
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  const handleErr = () => {
    toast.error("Expereince  is failed to Delete", {
      position: "bottom-right",
      autoClose: 5000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleSucess = () => {
    toast.success("Experince Deleted succcesfully!", {
      position: "bottom-right",
      autoClose: 5000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("role", data.role);
    formData.append("company", data.company);
    formData.append("duration", data.duration);
    formData.append("description", data.description);
    formData.append("image", image);

    for (let [key, value] of formData.entries())
      console.log(`${key}: ${value instanceof File ? value.name : value}`);

    try {
      const response = await axios.post(`${url}/work`, formData); // Don't set 'Content-Type' manually
     

      if (response.data.success) {
        handleSucess();
        console.log("Saved work");
      } else {
        console.log("Not saved work");
        handleErr();
      }
    } catch (err) {
      console.log(err);
      handleErr();
    }
  };

  //

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${url}/show/work`);
      

      // Check if the response is successful and contains contacts data
      if (response.data.success && Array.isArray(response.data.work)) {
        setWork(response.data.work);
        
        
      } else {
        handleErr();
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      handleErr();
    }
  };
  //deleting
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;
    //console.log("Attempting to delete ID:", id);

    try {
      const response = await fetch(`${url}/delete/work/${id}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
  
      if (result.success) {
        handleSucess()
        setWork((prevReports) => prevReports.filter((report) => report._id !== id));
      } else {
        alert(`Error: ${result.message}`);
        handleErr()
      }
    } catch (error) {
      console.error(error);
      //alert("Error deleting the record.");
      handleErr()
    }
  };
  useEffect(() => {
    fetchContacts();
  }, []);

  //
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center text-blue-600">
        Work Experience Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white shadow-md p-6 rounded-lg"
      >
        {/* Experience 1 */}
        <div className="border rounded-lg p-4 shadow-sm bg-gray-50 relative">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            Experience
          </h4>

          <label className="block mb-2 text-gray-600">
            Job Title:
            <input
              type="text"
              name="role"
              value={data.role}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg shadow-sm"
            />
          </label>

          <label className="block mb-2 text-gray-600">
            Company Name:
            <input
              type="text"
              name="company"
              value={data.company}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg shadow-sm"
            />
          </label>

          <label className="block mb-2 text-gray-600">
            Duration:
            <input
              type="text"
              name="duration"
              value={data.duration}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg shadow-sm"
            />
          </label>

          <label className="block mb-2 text-gray-600">
            Description:
            <textarea
              rows="3"
              name="description"
              value={data.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities or achievements."
              className="w-full mt-1 p-2 border rounded-lg shadow-sm"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Work Expereice Company Image
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

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() =>
              setData({ role: "", company: "", duration: "", description: "" })
            }
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Clear Form
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
      {/* fetching data */}
      <div className="fetechingdata">
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-blue-600 mt-8">
            Expeience {work.length}
          </h2>
          <div className="bg-white shadow-lg rounded-lg mt-6 w-full max-w-4xl p-6">
            {loading ? (
              <p className="text-center text-gray-500">Loadind Experince...</p>
            ) : work.length === 0 ? (
              <p className="text-center text-gray-500">
                No Experince available.
              </p>
            ) : (
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Role
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Company
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {work.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.role}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.company}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {contact.description
                          ? contact.description.split(" ").slice(0, 6).join(" ")
                          : ""}
                        ...
                      </td>

                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => {
                            const id = contact._id ;
                           
                            if (id) {
                              handleDelete(id);
                            } else {
                              handleErr()
                            }
                          }}
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
          {/* <ToastContainer /> */}
        </div>
      </div>
    </div>
  );
};

export default Experience;
