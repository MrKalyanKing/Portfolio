import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import upload from "../assets/upload.jpg";

import { AppContext } from "./Contextprovider";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Image as ImageIcon,
  ExternalLink,
  Github,
  Trash2,
  Plus,
  X,
  Filter,
  ArrowUpDown,
  Eye,
  Loader2,
  Edit3,
} from "lucide-react";

import { ProjectsSkeleton } from "./PageSkeleton";
import { getErrorMessage, getResponseMessage } from "../utils/errorMessage";



export function Projects() {
  const { url } = useContext(AppContext) || { url: "http://localhost:3000/api" };
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    title: "",
    kind: "",
    description: "",
    githublink: "",
    previewlink: "",
  });


  const [techName, setTechName] = useState("");
  const [techColor, setTechColor] = useState("#8d2ebc");

  // Edit Modal States
  const [editingProject, setEditingProject] = useState(null);
  const [editData, setEditData] = useState({ title: "", kind: "", description: "", githublink: "", previewlink: "" });
  const [editTags, setEditTags] = useState([]);
  const [editImage, setEditImage] = useState(null);
  const [editTechName, setEditTechName] = useState("");
  const [editTechColor, setEditTechColor] = useState("#8d2ebc");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleOpenEditModal = (project) => {
    setEditingProject(project);
    setEditData({
      title: project.title || "",
      kind: project.kind || "",
      description: project.description || "",
      githublink: project.githublink || "",
      previewlink: project.previewlink || "",
    });
    setEditTags(Array.isArray(project.tags) ? project.tags : []);
    setEditImage(null);
  };

  const handleEditTagAdd = () => {
    if (editTechName.trim() && editTechColor) {
      setEditTags([
        ...editTags,
        {
          id: Date.now(),
          name: editTechName.trim(),
          color: editTechColor,
        },
      ]);
      setEditTechName("");
    }
  };

  const handleEditTagRemove = (id) => {
    setEditTags(editTags.filter((tag) => tag.id !== id));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingProject) return;
    setIsUpdating(true);

    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("kind", editData.kind);
    formData.append("description", editData.description);
    formData.append("githublink", editData.githublink);
    formData.append("previewlink", editData.previewlink);
    formData.append("tags", JSON.stringify(editTags));

    if (editImage) {
      formData.append("image", editImage);
    }

    try {
      const response = await axios.post(
        `${url}/project/update/${editingProject._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        handleSuccess("Project updated successfully!");
        setEditingProject(null);
        projectFetch();
      } else {
        handleErr(getResponseMessage(response.data, "Failed to update project."));
      }
    } catch (err) {
      console.error("Error updating project:", err);
      handleErr(getErrorMessage(err, "Failed to update project."));
    } finally {
      setIsUpdating(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleErr = (msg = "Project is not saved!") => {
    toast.error(msg);
  };

  const handleSuccess = (msg = "Project added successfully!") => {
    toast.success(msg);
  };

  const handleTagAdd = () => {
    if (techName.trim() && techColor) {
      setTags([
        ...tags,
        {
          id: Date.now(),
          name: techName.trim(),
          color: techColor,
        },
      ]);
      setTechName("");
    }
  };

  const handleTagRemove = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload a project thumbnail image!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);

    formData.append("kind", data.kind);
    formData.append("description", data.description);
    formData.append("githublink", data.githublink);
    formData.append("previewlink", data.previewlink);
    formData.append("tags", JSON.stringify(tags));

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${url}/project`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        handleSuccess();
        // Reset form
        setData({ title: "", kind: "", description: "", githublink: "", previewlink: "" });
        setTags([]);
        setImage(null);
        // Fetch fresh project list
        projectFetch();
      } else {
        handleErr(getResponseMessage(response.data, "The project could not be saved."));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      handleErr(getErrorMessage(err, "The project could not be saved."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectFetch = async () => {
    try {
      const response = await axios.get(`${url}/show/project`);
      if (response.data.success && Array.isArray(response.data.project)) {
        setProjectList(response.data.project);
      } else {
        handleErr(getResponseMessage(response.data, "The project list could not be loaded."));
      }
    } catch (err) {
      handleErr(getErrorMessage(err, "The project list could not be loaded."));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${url}/delete/project/${id}`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        handleSuccess("Project deleted successfully!");
        setProjectList((prev) => prev.filter((p) => p._id !== id));
      } else {
        handleErr(getResponseMessage(result, "The project could not be deleted."));
      }
    } catch (err) {
      console.error(err);
      handleErr(getErrorMessage(err, "The project could not be deleted."));
    }
  };

  useEffect(() => {
    projectFetch();
  }, []);

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface">
            Manage Projects
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1">
            Oversee your digital portfolio and create new entries.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="liquid-glass-btn px-4 py-2 rounded-full font-label-sm text-xs font-semibold flex items-center gap-1.5 text-on-surface-variant">
            <Filter className="w-3.5 h-3.5 text-primary" /> Filter
          </button>
          <button className="liquid-glass-btn px-4 py-2 rounded-full font-label-sm text-xs font-semibold flex items-center gap-1.5 text-on-surface-variant">
            <ArrowUpDown className="w-3.5 h-3.5 text-primary" /> Sort
          </button>
        </div>
      </div>

      {/* Add New Project Form */}
      <section>
        <div className="liquid-glass-card ultra-rounded p-5 sm:p-8 md:p-10 inner-glow">
          <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface mb-6">
            Add New Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Top Row: Category and Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                  Project Category (Kind)
                </label>
                <input
                  type="text"
                  name="kind"
                  value={data.kind}
                  onChange={handleChange}
                  placeholder="e.g. FINTECH • BACKEND"
                  className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                  Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  placeholder="e.g. E-Commerce Platform"
                  className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                  required
                />
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="space-y-1.5">
              <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                Tech Stack Tags
              </label>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={techName}
                    onChange={(e) => setTechName(e.target.value)}
                    placeholder="e.g. React"
                    className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                  />
                </div>
                {/* Color picker box */}
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl border border-white/80 flex-shrink-0 cursor-pointer overflow-hidden shadow-sm hover:scale-105 transition-transform"
                  style={{ backgroundColor: techColor }}
                  title="Choose Tag Color"
                >
                  <input
                    type="color"
                    value={techColor}
                    onChange={(e) => setTechColor(e.target.value)}
                    className="w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleTagAdd}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl liquid-glass-btn text-primary flex items-center justify-center flex-shrink-0"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Added Tags Badges */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm liquid-glass-btn"
                      style={{ backgroundColor: tag.color || "#8d2ebc" }}
                    >
                      {tag.name}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag.id)}
                        className="hover:opacity-75 transition-opacity ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Links Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                  GitHub Link
                </label>
                <input
                  type="url"
                  name="githublink"
                  value={data.githublink}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                  Live Preview
                </label>
                <input
                  type="url"
                  name="previewlink"
                  value={data.previewlink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                Description Points (End each point with a period '.' or new line):
              </label>
              <textarea
                name="description"
                rows="4"
                value={data.description}
                onChange={handleChange}
                placeholder="Built real-time features with WebSockets. Optimized MongoDB queries. Implemented JWT authentication."
                className="w-full liquid-glass-input rounded-2xl px-4 sm:px-5 py-3 text-sm text-on-surface placeholder:text-outline/60 outline-none resize-none"
                required
              />
            </div>


            {/* Project Thumbnail Upload Zone */}
            <div className="space-y-1.5">
              <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                Project Thumbnail
              </label>
              <label className="w-full aspect-[3/1] sm:aspect-[4/1] liquid-glass-input border-2 border-dashed border-white/80 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/60 transition-all gap-1.5 group relative overflow-hidden p-4">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <ImageIcon className="w-7 h-7 text-outline group-hover:text-primary transition-colors" />
                    <span className="text-xs font-label-sm font-semibold text-outline group-hover:text-on-surface transition-colors">
                      Click to upload image
                    </span>
                  </>
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                />
              </label>
            </div>


            {/* Submit Button */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full liquid-glass-btn-primary text-white font-headline font-bold py-3.5 sm:py-4 rounded-full shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Saving Project...</span>
                  </>
                ) : (
                  <span>Save Project</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Published Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-xl sm:text-2xl text-on-surface">
            Published Projects
          </h2>
          <span className="liquid-glass-btn text-primary px-4 py-1.5 rounded-full font-label-xs text-xs font-bold uppercase tracking-wider">
            {projectList.length} TOTAL
          </span>
        </div>

        {loading ? (
          <ProjectsSkeleton />
        ) : projectList.length === 0 ? (
          <div className="liquid-glass-card ultra-rounded text-center py-16 p-6">
            <ImageIcon className="w-12 h-12 text-outline/50 mx-auto mb-3" />
            <p className="text-on-surface-variant font-medium">No published projects found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {projectList.map((p, index) => (
              <div
                key={p._id || index}
                className="liquid-glass-card ultra-rounded overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-500"
              >
                <div className="relative h-52 sm:h-56 overflow-hidden bg-surface-container">
                  <img
                    src={
                      p.image?.startsWith("http")
                        ? p.image
                        : `${url.replace("/api", "")}/uploads/${p.image}`
                    }
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = upload;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="liquid-glass-btn-primary text-white px-3 py-1 rounded-full font-label-xs text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      LIVE
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {p.githublink && (
                      <a
                        href={p.githublink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 liquid-glass-btn text-white rounded-full hover:scale-110 transition-transform"
                        title="GitHub Repo"
                      >
                        <Github className="w-4 h-4 text-on-surface" />
                      </a>
                    )}
                    {p.previewlink && (
                      <a
                        href={p.previewlink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 liquid-glass-btn text-white rounded-full hover:scale-110 transition-transform"
                        title="Live Preview"
                      >
                        <ExternalLink className="w-4 h-4 text-on-surface" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
                  <div>
                    <p className="font-label-xs text-xs text-secondary font-bold uppercase tracking-widest mb-1">
                      {p.kind || "WEB APPLICATION"}
                    </p>
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
                      {p.title}
                    </h3>
                  </div>

                  {typeof p.description === 'string' && p.description.includes('.') ? (
                    <ul className="text-xs sm:text-sm text-on-surface-variant space-y-1 my-1">
                      {p.description
                        .split(/(?<=\.)\s+|\n+/)
                        .map((point) => point.trim())
                        .filter((point) => point.length > 0)
                        .slice(0, 3)
                        .map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">•</span>
                            <span>{point.endsWith('.') ? point : `${point}.`}</span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2">
                      {p.description}
                    </p>
                  )}


                  <div className="flex flex-wrap gap-2 pt-1">
                    {Array.isArray(p.tags) &&
                      p.tags.slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm liquid-glass-btn"
                          style={{ backgroundColor: t.color || "#0058bc" }}
                        >
                          {t.name}
                        </span>
                      ))}
                    {Array.isArray(p.tags) && p.tags.length > 4 && (
                      <span className="liquid-glass-btn text-on-surface-variant px-3 py-1 rounded-full text-xs font-semibold">
                        +{p.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/40">
                    <span className="text-xs font-label-xs text-outline font-medium">
                      Updated recently
                    </span>
                    <div className="flex gap-2">
                      {p.previewlink && (
                        <a
                          href={p.previewlink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 liquid-glass-btn text-on-surface-variant hover:text-primary rounded-full transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-2 liquid-glass-btn text-primary rounded-full transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 liquid-glass-btn-danger text-error rounded-full transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Edit Project Responsive Liquid Glass Modal */}
      {editingProject && createPortal(
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
                    Edit Project
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">Update project parameters and assets</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    Project Title:
                  </label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    Category / Kind:
                  </label>
                  <input
                    type="text"
                    value={editData.kind}
                    onChange={(e) => setEditData({ ...editData, kind: e.target.value })}
                    className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Tech Stack Tags Editor */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Tech Stack Tags:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editTechName}
                    onChange={(e) => setEditTechName(e.target.value)}
                    placeholder="e.g. React"
                    className="flex-1 bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-2.5 shadow-inner transition-all outline-none"
                  />
                  <input
                    type="color"
                    value={editTechColor}
                    onChange={(e) => setEditTechColor(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <button
                    type="button"
                    onClick={handleEditTagAdd}
                    className="px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-purple-500/20 transition-all active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {editTags.map((tag) => (
                    <span
                      key={tag.id || tag.name}
                      style={{ backgroundColor: tag.color + "20", borderColor: tag.color + "50", color: tag.color }}
                      className="px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-sm"
                    >
                      {tag.name}
                      <button
                        type="button"
                        onClick={() => handleEditTagRemove(tag.id)}
                        className="hover:opacity-75"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    GitHub Link:
                  </label>
                  <input
                    type="url"
                    value={editData.githublink}
                    onChange={(e) => setEditData({ ...editData, githublink: e.target.value })}
                    className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">
                    Live Preview Link:
                  </label>
                  <input
                    type="url"
                    value={editData.previewlink}
                    onChange={(e) => setEditData({ ...editData, previewlink: e.target.value })}
                    className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Description Points (End each point with a period '.' or new line):
                </label>
                <textarea
                  rows="3"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  placeholder="Built real-time features with WebSockets. Optimized MongoDB queries. Implemented JWT authentication."
                  className="w-full bg-slate-50/90 border border-slate-200/90 focus:border-purple-600 focus:bg-white focus:ring-4 focus:ring-purple-600/15 text-slate-800 text-sm rounded-2xl px-4 py-3 shadow-inner transition-all outline-none resize-none"
                  required
                />
              </div>


              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 ml-1">
                  Thumbnail Image (Optional - upload to replace):
                </label>
                <div className="w-full border-2 border-dashed border-slate-300/80 bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-3 flex items-center justify-between gap-4 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <img
                        src={editImage ? URL.createObjectURL(editImage) : (editingProject.image ? (editingProject.image.startsWith("http") ? editingProject.image : `${url.replace('/api', '')}/uploads/${editingProject.image}`) : upload)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Update thumbnail asset</p>
                      <p className="text-[11px] text-slate-500 font-medium">Leave empty to keep existing image</p>
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
                  onClick={() => setEditingProject(null)}
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
                      <span>Updating Project...</span>
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
}


