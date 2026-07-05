import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "./Contextprovider";
import { toast } from "react-toastify";
import { Sparkles, UploadCloud, Loader2 } from "lucide-react";
import { TechStackSkeleton } from "./PageSkeleton";
import { getErrorMessage, getResponseMessage } from "../utils/errorMessage";

const TechStack = () => {
  const { url } = useContext(AppContext) || { url: "http://localhost:3000/api" };
  const [techImage, setTechImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setTechImage(URL.createObjectURL(file));
    }
  };

  const handleErr = (msg = "The tech stack image could not be saved.") => {
    toast.error(msg);
    setIsSubmitting(false);
  };

  const handleSuccess = () => {
    toast.success("Tech stack image added successfully!");
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload an image!");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(`${url}/techstack`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        handleSuccess();
      } else {
        handleErr(getResponseMessage(response.data, "The tech stack image could not be saved."));
      }
    } catch (err) {
      console.error(err);
      handleErr(getErrorMessage(err, "The tech stack image could not be saved."));
    }
  };

  if (loading) {
    return <TechStackSkeleton />;
  }

  return (
    <div className="space-y-10 max-w-2xl mx-auto">

      <div>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-on-surface text-center">
          Tech Stack Assets
        </h1>
        <p className="font-body-md text-base text-on-surface-variant mt-1 text-center">
          Upload logo assets and technologies to showcase on your portfolio.
        </p>
      </div>

      <div className="glass-card ultra-rounded p-8 inner-glow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-36 h-36 rounded-3xl overflow-hidden border-2 border-white/80 bg-white/50 shadow-lg flex items-center justify-center mb-6">
              {techImage ? (
                <img
                  src={techImage}
                  alt="Tech Stack Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Sparkles className="w-12 h-12 text-primary" />
              )}
            </div>

            <label
              htmlFor="tech-image"
              className="w-full border-2 border-dashed border-outline-variant/60 bg-white/30 hover:bg-white/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all group"
            >
              <UploadCloud className="w-8 h-8 text-outline group-hover:text-primary transition-colors mb-2" />
              <span className="text-sm font-label-sm font-semibold text-on-surface">
                Click to select tech icon / image
              </span>
              <span className="text-xs text-outline mt-1">PNG, SVG or JPG format</span>
              <input
                type="file"
                id="tech-image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full liquid-glass-btn-primary text-white font-headline font-bold py-4 rounded-full shadow-lg hover:scale-[1.01] transition-all text-base flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Uploading Asset...</span>
              </>
            ) : (
              <span>Submit Tech Stack Image</span>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default TechStack;
