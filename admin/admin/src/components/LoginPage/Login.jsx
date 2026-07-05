import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "./login.module.css";
import avatar from "../../assets/avatar.svg";
import bg from "../../assets/bg.svg";
import wave from "../../assets/wave.png";
import axios from "axios";

const LoginPopUp = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [data, setData] = useState({
    user: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const url = "https://collegesite-backend-e1x7.onrender.com/api/admin/login";
    try {
      const response = await axios.post(url, data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/admin/pannel");
      } else {
        toast.error("You are not authorized to login!");
      }
    } catch (err) {
      toast.error("Failed to login, please try again.");
    }
  };

  return (
    <>
      <img className={styles.wave} src={wave} alt="wave" data-aos="zoom-out-right" />
      <div className={styles.ans}>
        <div className={styles.img}>
          <img src={bg} alt="background" data-aos="fade-left" />
        </div>
        <div className={styles.loginContent}>
          <form onSubmit=''>
            <img src={avatar} alt="avatar" data-aos="flip-down" />
            <h2 className={styles.title} data-aos="fade-right">
              Welcome
            </h2>
            <div className={`${styles.inputDiv} ${styles.one}`} data-aos="fade-zoom-out">
              <div className={styles.i} data-aos="fade-left">
                <i className="fas fa-user"></i>
              </div>
              <div className={styles.div}>
                <input
                  onChange={onChangeHandler}
                  type="text"
                  name="user"
                  value=''
                  className={styles.input}
                  placeholder="Username"
                />
              </div>
            </div>
            <div className={styles.inputDiv} data-aos="fade-left">
              <div className={styles.i}>
                <i className="fas fa-lock"></i>
              </div>
              <div className={styles.div}>
                <input
                  onChange={onChangeHandler}
                  type="password"
                  name="password"
                  value=''
                  className={styles.input}
                  placeholder="Password"
                />
              </div>
            </div>
            <input
              type="submit"
              className={styles.btn}
              value="Login"
              data-aos="fade-up"
            />
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default LoginPopUp;
