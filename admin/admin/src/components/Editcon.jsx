import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from './Contextprovider';

const Editcon = () => {
  const { url } = useContext(AppContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleErr=()=>{
             toast.error("Network error please try again", {
                  position: "bottom-right",
                  autoClose: 5000, // Close after 5 seconds
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });    
          }
          const handlesuccess=()=>{
                     toast.success("Contact is deleted", {
                          position: "bottom-right",
                          autoClose: 5000, // Close after 5 seconds
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });    
                  }

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${url}/show/contact`);

  
      // Check if the response is successful and contains contacts data
      if (response.data.success && Array.isArray(response.data.contacts)) {
        setContacts(response.data.contacts);
        
      } else {
        toast.error('No contacts found or error fetching contacts.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to fetch contacts. Please try again later.');
      setLoading(false);
    }
  };
   //deleting 

   const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;
    //console.log("Attempting to delete ID:", id);

    try {
      const response = await fetch(`${url}/delete/${id}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
  
      if (result.success) {
        handlesuccess()
        setContacts((prevReports) => prevReports.filter((report) => report._id !== id));
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
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-blue-600 mt-8">
        Contact Page {contacts.length}
      </h2>
      <div className="bg-white shadow-lg rounded-lg mt-6 w-full max-w-4xl p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading contacts...</p>
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-500">No contacts available.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{contact.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{contact.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
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
  );
};

export default Editcon;
