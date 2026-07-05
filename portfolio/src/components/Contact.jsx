import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import axios from 'axios'
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {

  
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleErr=()=>{
    toast.error("Response Sent is Failed!", {
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

  const handleSucess=()=>{
    toast.success("Response is Sent  Successfully!", {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

   const formData =new FormData();
   formData.append("name",form.name)
   formData.append("description",form.description)
   formData.append("email",form.email)
  
  

   try {
    let response = await axios.post("http://localhost:3000/api/contact", formData, {
      headers: { "Content-Type": "application/json" },
    });
  
    console.log("Response Data:", response.data);  // Log the response to verify
    handleSucess()
    if (response.data.success) {
      setForm({
        name: "",
        description: "",
        email: "",
      });
      console.log("Contact saved");
      handleSucess();
    }
    // else {
    //   console.log("Contact not saved");
    //   handleErr();
    // }
  } catch (err) {
    // Log the error to identify what went wrong
    console.log('Contact is not saved:', err.response || err.message || err);
    handleErr();
  } finally {
    setLoading(false);
  }

  // sending an email service
  
  const payload = {
    name: form.name,
    email: form.email,
    description: form.description,
  };
   
  try {
    // Send the email
    const emailResponse = await axios.post(`http://localhost:3000/api/sendemail`, payload);
    console.log("Email Response: ", emailResponse.data);

    if (emailResponse.data.success) {
      //alert("Report submitted and email sent successfully!");
      // Reset form data
      setForm({
        name: "",
        email: "",
        description:""
      });
      
    } else {
      alert("Error sending email");
    }
  } catch (error) {
    console.error("Error during email submission: ", error);
    
  }


  //  closing an email service
  
  };
  
  // useEffect(()=>{
  //  console.log(form.name,form.description,form.email)
  // },[form])
  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='description'
              value={form.description}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
      <ToastContainer/>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
