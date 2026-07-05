import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "./Contextprovider";
import { Trash2, Mail, User, MessageSquare } from "lucide-react";
import { ContactsSkeleton } from "./PageSkeleton";
import { getErrorMessage, getResponseMessage } from "../utils/errorMessage";

const Editcon = () => {
  const { url } = useContext(AppContext) || { url: "http://localhost:3000/api" };
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleErr = (msg = "Something went wrong — please try again.") => {
    toast.error(msg);
  };

  const handleSuccess = () => {
    toast.success("Contact entry deleted");
  };

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${url}/show/contact`);
      if (response.data.success && Array.isArray(response.data.contacts)) {
        setContacts(response.data.contacts);
      } else {
        handleErr(getResponseMessage(response.data, "The contact messages could not be loaded."));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      handleErr(getErrorMessage(error, "The contact messages could not be loaded."));
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact message?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${url}/delete/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        handleSuccess();
        setContacts((prevReports) => prevReports.filter((report) => report._id !== id));
      } else {
        handleErr(getResponseMessage(result, "The contact could not be deleted."));
      }
    } catch (error) {
      console.error(error);
      handleErr(getErrorMessage(error, "The contact could not be deleted."));
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <ContactsSkeleton />;
  }

  return (
    <div className="space-y-10">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline font-bold text-3xl md:text-4xl text-on-surface">
            Contact Messages
          </h1>
          <p className="font-body-md text-base text-on-surface-variant mt-1">
            View inquiry submissions sent from your portfolio website.
          </p>
        </div>
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-xs text-xs font-bold uppercase">
          {contacts.length} MESSAGES
        </span>
      </div>

      <div className="glass-card ultra-rounded overflow-hidden inner-glow p-6 sm:p-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-12 h-12 text-outline/40 mx-auto mb-3" />
            <p className="text-on-surface-variant font-medium">No contact messages available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/40 text-on-surface-variant text-xs uppercase tracking-wider font-label-xs font-bold">
                  <th className="py-4 px-4">Name</th>
                  <th className="py-4 px-4">Email</th>
                  <th className="py-4 px-4">Message / Description</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/30 text-sm">
                {contacts.map((contact) => (
                  <tr key={contact._id} className="hover:bg-white/40 transition-colors">
                    <td className="py-4 px-4 font-semibold text-on-surface">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" />
                        <span>{contact.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-secondary" />
                        <a href={`mailto:${contact.email}`} className="hover:underline">
                          {contact.email}
                        </a>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant max-w-xs leading-relaxed">
                      {contact.description}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className="p-2 text-on-surface-variant hover:text-error rounded-full hover:bg-error-container/40 transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Editcon;
