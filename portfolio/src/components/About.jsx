import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { styles } from "../styles";
import { services } from "../constants"; // Make sure this is imported correctly
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import pdf from '../assets/KalyanNewResume-1.pdf'
// ServiceCard Component
const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img src={icon} alt={title} className="w-16 h-16 object-contain" />
        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

// About Component
const About = () => {
  

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>
        {/* Social Media and Download Resume Section */}
        <div className="flex flex-col gap-5 mt-8 mb-20">
            {/* Download Resume Button */}
            <a
              href={pdf}
              download
              className="bg-[#915EFF] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#7A4DE7] transition duration-300 ease-in-out cursor-pointer"
            >
              Download Resume
            </a>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/kalyan-badhavath-7a4178281?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl hover:text-[#915EFF] transition duration-300 ease-in-out cursor-pointer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/MrKalyanKing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl hover:text-[#915EFF] transition duration-300 ease-in-out cursor-pointer"
              >
                <FaGithub />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl hover:text-[#915EFF] transition duration-300 ease-in-out cursor-pointer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a skilled software developer with experience in TypeScript and
        JavaScript, and expertise in frameworks like React, Node.js, and
        Three.js. I'm a quick learner and collaborate closely with clients to
        create efficient, scalable, and user-friendly solutions that solve
        real-world problems. Let's work together to bring your ideas to life!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.length === 0 ? (
          <p>No services available</p> // Render a fallback if services is empty
        ) : (
          services.map((service, index) => (
            <ServiceCard key={service.title} index={index} {...service} />
          ))
        )}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
