import React, { useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import upload from "../assets/upload.jpg";

import axios from "axios";
import { AppContext } from "./Contextprovider";
import { toast } from "react-toastify";
import { Briefcase, Building2, MapPin, Calendar, Trash2, Plus, TrendingUp, Edit3, Loader2, X } from "lucide-react";

import { ExperienceSkeleton } from "./PageSkeleton";
import { getErrorMessage, getResponseMessage } from "../utils/errorMessage";



const Experience = () => {
  const { url } = useContext(AppContext) || { url: "http://localhost:3000/api" };

  const [image, setImage] = useState(null);
  const [work, setWork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    role: "",
    company: "",
    location: "",
    duration: "",
    description: "",
    techStack: "",
  });

  const handleErr = (msg) => {
    toast.error(msg || "Failed to process the request.");
  };

  const handleSuccess = (msg) => {
    toast.success(msg || "Success!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit Experience Modal States
  const [editingExperience, setEditingExperience] = useState(null);
  const [editData, setEditData] = useState({
    role: "",
    company: "",
    location: "",
    duration: "",
    description: "",
    techStack: "",
  });
  const [editImage, setEditImage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenEditModal = (item) => {
    setEditingExperience(item);
    setEditData({
      role: item.role || "",
      company: item.company || "",
      location: item.location || "",
      duration: item.duration || "",
      description: Array.isArray(item.description) ? item.description.join("\n") : (item.description || ""),
      techStack: Array.isArray(item.techStack) ? item.techStack.join(", ") : (item.techStack || ""),
    });
    setEditImage(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingExperience) return;
    setIsUpdating(true);

    const pointsArray = editData.description
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const techStackArray = editData.techStack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const formData = new FormData();
    formData.append("role", editData.role);
    formData.append("company", editData.company);
    formData.append("location", editData.location);
    formData.append("duration", editData.duration);
    formData.append("description", JSON.stringify(pointsArray));
    formData.append("techStack", JSON.stringify(techStackArray));
    if (editImage) formData.append("image", editImage);

    try {
      const response = await axios.post(`${url}/work/update/${editingExperience._id}`, formData);
      if (response.data.success) {
        handleSuccess("Experience record updated successfully!");
        setEditingExperience(null);
        fetchContacts();
      } else {
        handleErr("Failed to update experience.");
      }
    } catch (err) {
      console.error("Error updating experience:", err);
      handleErr("Server error while updating.");
    } finally {
      setIsUpdating(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Parse description into an array of points (split by newline)
    const pointsArray = data.description
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    // Parse techStack into an array of tags (split by comma)
    const techStackArray = data.techStack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const formData = new FormData();
    formData.append("role", data.role);
    formData.append("company", data.company);
    formData.append("location", data.location);
    formData.append("duration", data.duration);
    formData.append("description", JSON.stringify(pointsArray));
    formData.append("techStack", JSON.stringify(techStackArray));
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${url}/work`, formData);
      if (response.data.success) {
        handleSuccess("Experience saved successfully!");
        setData({ role: "", company: "", location: "", duration: "", description: "", techStack: "" });
        setImage(null);
        fetchContacts();
      } else {
        handleErr(getResponseMessage(response.data, "The experience could not be saved."));
      }
    } catch (err) {
      console.error(err);
      handleErr(getErrorMessage(err, "The experience could not be saved."));
    } finally {
      setIsSubmitting(false);
    }
  };


  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/show/work`);
      if (response.data.success && Array.isArray(response.data.work)) {
        setWork(response.data.work);
      } else {
        handleErr(getResponseMessage(response.data, "The experience list could not be loaded."));
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
      handleErr(getErrorMessage(error, "The experience list could not be loaded."));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this experience record?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${url}/delete/work/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        handleSuccess("Experience deleted successfully!");
        setWork((prev) => prev.filter((report) => report._id !== id));
      } else {
        handleErr(getResponseMessage(result, "The experience could not be deleted."));
      }
    } catch (error) {
      console.error(error);
      handleErr(getErrorMessage(error, "The experience could not be deleted."));
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <ExperienceSkeleton />;
  }

  return (
    <div className="space-y-10">
      {/* Title Header */}

      <div>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-on-surface">
          Experience Manager
        </h1>
        <p className="font-body-md text-base text-on-surface-variant mt-1">
          Curate and document your professional journey with precision.
        </p>
      </div>

      {/* Main Grid: Form + Insights Side Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Form Column */}
        <div className="lg:col-span-8">
          <div className="liquid-glass-card ultra-rounded p-5 sm:p-8 inner-glow">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full liquid-glass-btn text-primary flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">
                New Experience
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                    Job Title:
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={data.role}
                    onChange={handleChange}
                    placeholder="e.g., Open Source Contributor"
                    className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={data.company}
                    onChange={handleChange}
                    placeholder="e.g., Rocket.Chat"
                    className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                    Location:
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={data.location}
                    onChange={handleChange}
                    placeholder="e.g., Remote or City"
                    className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                    Duration:
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={data.duration}
                    onChange={handleChange}
                    placeholder="e.g., Jan 2025 - Present"
                    className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                  Description Points (One per line):
                </label>
                <textarea
                  rows="4"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Shipped production-ready UI fixes...&#10;Worked in a distributed team..."
                  className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none resize-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                  Tech Stack (Comma separated):
                </label>
                <input
                  type="text"
                  name="techStack"
                  value={data.techStack}
                  onChange={handleChange}
                  placeholder="React, TypeScript, CI/CD, Code Review"
                  className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                  Company Logo / Image
                </label>
                <div className="w-full border-2 border-dashed border-white/80 liquid-glass-input rounded-2xl p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/90 bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <img
                        src={image ? URL.createObjectURL(image) : upload}
                        alt="upload"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface">Upload logo asset</p>
                      <p className="text-[11px] text-outline">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  <label className="cursor-pointer liquid-glass-btn font-label-sm text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-all text-primary">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/40">
                <button
                  type="button"
                  onClick={() =>
                    setData({ role: "", company: "", location: "", duration: "", description: "", techStack: "" })
                  }
                  className="px-6 py-2.5 rounded-full liquid-glass-btn font-label-sm text-xs font-semibold text-on-surface-variant"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full liquid-glass-btn-primary font-label-sm text-xs font-bold text-white shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Saving Experience...</span>
                    </>
                  ) : (
                    <span>Save Experience</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>


        {/* Insights Side Widget */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="liquid-glass-card ultra-rounded p-6 inner-glow flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-headline font-bold text-xl text-on-surface mb-3 flex items-center gap-2">
                Insights
              </h3>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                Your career trajectory has grown by{" "}
                <span className="font-bold text-secondary">14%</span> in technical complexity this quarter.
              </p>
            </div>

            {/* Decorative Bar Chart Pillar Graphic */}
            <div className="pt-8 flex items-end justify-between gap-2 h-44 px-2">
              <div className="w-full bg-primary-fixed-dim/40 rounded-t-full h-1/2 transition-all hover:h-3/4"></div>
              <div className="w-full bg-primary-container/60 rounded-t-full h-3/4 transition-all hover:h-full"></div>
              <div className="w-full bg-primary-fixed-dim/40 rounded-t-full h-1/3 transition-all hover:h-2/3"></div>
              <div className="w-full bg-primary rounded-t-full h-full shadow-lg shadow-primary/30"></div>
              <div className="w-full bg-secondary rounded-t-full h-4/5 shadow-lg shadow-secondary/30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing Experiences List */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-2xl text-on-surface">
            Existing Experiences
          </h2>
          <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-label-xs text-xs font-bold uppercase">
            {work.length} TOTAL
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : work.length === 0 ? (
          <div className="glass-card ultra-rounded text-center py-12 p-6">
            <p className="text-on-surface-variant font-medium">No experiences added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {work.map((exp, index) => (
              <div
                key={exp._id || index}
                className="glass-card ultra-rounded p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white border border-white/60 shadow-sm flex items-center justify-center flex-shrink-0">
                    <img
                      src={
                        exp.image?.startsWith("http")
                          ? exp.image
                          : `${url.replace("/api", "")}/uploads/${exp.image}`
                      }
                      alt={exp.company}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = upload;
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-headline text-lg font-bold text-on-surface">
                        {exp.role}
                      </h3>
                      {index === 0 && (
                        <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                      {exp.company} {exp.duration ? `• ${exp.duration}` : ""} {exp.location ? `• ${exp.location}` : ""}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {Array.isArray(exp.techStack) &&
                        exp.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-surface-container text-on-surface-variant text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleOpenEditModal(exp)}
                    className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-white/40 transition-colors"
                    title="Edit Record"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-2 text-on-surface-variant hover:text-error rounded-full hover:bg-error-container/40 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit Experience Responsive Liquid Glass Modal */}
      {editingExperience && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[9999] backdrop-blur-md bg-grey-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
          {/* Ambient Glow mesh background behind modal */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div className="w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[90px] -ml-32"></div>
          </div>

          <div className="bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_25px_70px_rgba(0,0,0,0.18)] rounded-[32px] p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative my-auto">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center shadow-sm">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-headline text-lg sm:text-xl font-bold text-slate-800">
                    Edit Experience
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Update employment record details</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingExperience(null)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    Job Title:
                  </label>
                  <input
                    type="text"
                    value={editData.role}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    value={editData.company}
                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                    className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    Location:
                  </label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    Duration:
                  </label>
                  <input
                    type="text"
                    value={editData.duration}
                    onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
                    className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Description Points (One per line):
                </label>
                <textarea
                  rows="4"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none resize-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Tech Stack (Comma separated):
                </label>
                <input
                  type="text"
                  value={editData.techStack}
                  onChange={(e) => setEditData({ ...editData, techStack: e.target.value })}
                  className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Company Logo (Optional - upload to replace):
                </label>
                <div className="w-full border-2 border-dashed border-slate-300/80 bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-3 flex items-center justify-between gap-4 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <img
                        src={editImage ? URL.createObjectURL(editImage) : (editingExperience.image ? (editingExperience.image.startsWith("http") ? editingExperience.image : `${url.replace('/api', '')}/uploads/${editingExperience.image}`) : upload)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Update logo asset</p>
                      <p className="text-[11px] text-slate-500 font-medium">Leave empty to keep existing logo</p>
                    </div>
                  </div>
                  <label className="cursor-pointer bg-white hover:bg-slate-100 border border-slate-200 text-purple-700 text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-all shadow-sm">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setEditImage(e.target.files[0])}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setEditingExperience(null)}
                  className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Updating Experience...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default Experience;


