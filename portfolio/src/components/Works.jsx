
import React, { useState, useEffect, useContext } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styles } from "../styles";
import { github } from "../assets";
import lives from "../assets/live.png";
import { SectionWrapper } from "../hoc";
import axios from "axios";
import { AppContext } from "../../../admin/admin/src/components/Contextprovider"; // Update this path if necessary
import { fadeIn, textVariant, slideIn } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags = [],
  image,
  githublink,
  previewlink,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    handleResize(); // Initialize state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fullImageUrl = `http://localhost:3000/uploads/${image}`
  return (
    <motion.div variants={slideIn("up", "spring", index * 0.5, 0.75)}>
      <div
        className={`bg-tertiary p-5 rounded-2xl ${
          isMobile ? "w-full" : "sm:w-[360px] w-full"
        }`}
      >
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="relative w-full h-[230px]"
        >
          <img
            src={fullImageUrl}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Live Preview Button */}
          <div className="absolute bottom-0 flex justify-end card-img_hover">
            <div
              onClick={() => window.open(previewlink, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={lives}
                alt="preview"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>

          {/* GitHub Button */}
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(githublink, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </Tilt>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <p key={idx} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);
  //const { url } = useContext(AppContext); // Assuming AppContext provides the base URL

  // Toast notification handlers
  const handleErr = () => {
    toast.error("Network error, please try again", {
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
    toast.success("Projects fetched successfully!", {
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

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/show/project");
      if (response.data.success && Array.isArray(response.data.project)) {
        setProjects(response.data.project);
        //handleSuccess();
      } else {
        handleErr();
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      handleErr();
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [])

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default SectionWrapper(Works, "");
