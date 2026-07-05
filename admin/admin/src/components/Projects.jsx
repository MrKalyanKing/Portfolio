import React, { useContext, useEffect, useState } from "react";
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
        "http://localhost:3000/api/project",
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
      const response = await axios.get("http://localhost:3000/api/show/project");
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

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/delete/project/${id}`, { method: "DELETE" });
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
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={data.description}
                onChange={handleChange}
                placeholder="Describe your project..."
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
                        : `http://localhost:3000/uploads/${p.image}`
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

                  <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2">
                    {p.description}
                  </p>

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
                        onClick={() => deleteProject(p._id)}
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


    </div>
  );
}
