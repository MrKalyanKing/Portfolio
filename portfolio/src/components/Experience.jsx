// import React from "react";
// import axios from 'axios'
// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
// import { motion } from "framer-motion";

// import "react-vertical-timeline-component/style.min.css";

// import { styles } from "../styles";
// import { experiences } from "../constants";
// import { SectionWrapper } from "../hoc";
// import { textVariant } from "../utils/motion";
// import { useState } from "react";
// import { useEffect } from "react";

// const ExperienceCard = ({ experience }) => {
//   return (
//     <VerticalTimelineElement
//       contentStyle={{
//         background: "#1d1836",
//         color: "#fff",
//       }}
//       contentArrowStyle={{ borderRight: "7px solid  #232631" }}
//       date={experience.date}
//       iconStyle={{ background: experience.iconBg }}
//       icon={
//         <div className='flex justify-center items-center w-full h-full'>
//           <img
//             src={experience.icon}
//             alt={experience.company_name}
//             className='w-[60%] h-[60%] object-contain'
//           />
//         </div>
//       }
//     >
//       <div>
//         <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
//         <p
//           className='text-secondary text-[16px] font-semibold'
//           style={{ margin: 0 }}
//         >
//           {experience.company_name}
//         </p>
//       </div>

//       <ul className='mt-5 list-disc ml-5 space-y-2'>
//         {experience.points.map((point, index) => (
//           <li
//             key={`experience-point-${index}`}
//             className='text-white-100 text-[14px] pl-1 tracking-wider'
//           >
//             {point}
//           </li>
//         ))}
//       </ul>
//     </VerticalTimelineElement>
//   );
// };

// const Experience = async () => {

//  const[workexp,setworkexp]=useState([])
//  const handleErr = () => {
//      toast.error("Network error, please try again", {
//        position: "bottom-right",
//        autoClose: 5000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//        theme: "light",
//      });
//    };
 
//    const handleSuccess = () => {
//      toast.success("Projects fetched successfully!", {
//        position: "bottom-right",
//        autoClose: 5000,
//        hideProgressBar: false,
//        closeOnClick: true,
//        pauseOnHover: true,
//        draggable: true,
//        progress: undefined,
//        theme: "light",
//      });
//    };
//  const fetchwork = async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/api/show/work");
//     if (response.data.success && Array.isArray(response.data.work)) {
//       setworkexp(response.data.work);
//       handleSuccess();
//     } else {
//       handleErr();
//     }
//   } catch (error) {
//     console.error("Error fetching projects:", error);
//     handleErr();
//   }
//   useEffect(()=>{
//     fetchwork()
//   },[])
// };
//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={`${styles.sectionSubText} text-center`}>
//           What I have done so far
//         </p>
//         <h2 className={`${styles.sectionHeadText} text-center`}>
//           Work Experience.
//         </h2>
//       </motion.div>

//       <div className='mt-20 flex flex-col'>
//         <VerticalTimeline>
//           {workexp.map((experience, index) => (
//             <ExperienceCard
//               key={`experience-${index}`}
//               experience={experience}
//             />
//           ))}
//         </VerticalTimeline>
//       </div>
//     </>
//   );
// };

// export default SectionWrapper(Experience, "work");
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-vertical-timeline-component/style.min.css";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  // Construct the full image URL
  const fullImageUrl = `http://localhost:3000/uploads/${experience.image}`;
  

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.duration}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={fullImageUrl} // Use the full image URL
            alt={experience.company}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.role}</h3>
        <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
          {experience.company}
        </p>
      </div>

      {/* <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li key={`experience-point-${index}`} className="text-white-100 text-[14px] pl-1 tracking-wider">
            {point}
          </li>
        ))}
      </ul> */}
      <ul className="mt-5 list-disc ml-5 space-y-2">
        <li className="text-white-100 text-[14px] pl-1 tracking-wider">
           {experience.description}
        </li>
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [workexp, setworkexp] = useState([]);

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
    toast.success("Work experience fetched successfully!", {
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

  const fetchWork = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/show/work");
      if (response.data.success && Array.isArray(response.data.work)) {
        setworkexp(response.data.work);
        //handleSuccess();
      } else {
        handleErr();
      }
    } catch (error) {
      console.error("Error fetching work experience:", error);
      handleErr();
    }
  };

  useEffect(() => {
    fetchWork();
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>What I have done so far</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {workexp.map((experience, index) => (
            <ExperienceCard key={`experience-${index}`} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>

      <ToastContainer />
    </>
  );
};

export default SectionWrapper(Experience, "work");
