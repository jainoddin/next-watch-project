import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OTPInput, { ResendOTP } from "otp-input-react";
import emailjs from "emailjs-com";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apilist from "../../apilist/Apilist";


const Signup = () => {
  const [showSubmitError, setShowSubmitError] = useState(false);
  const navigateFunc = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otp, setOtp] = useState("");
  const [sendingOTP, setSendingOTP] = useState(false);
  const [emailValue, setemailValue] = useState("");
  const [email, setEmail] = useState("");
  const popupRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword, setShowPassword]);

  const sendOTPToEmail = (email, otp) => {
    const serviceId = "service_tdbb3rg";
    const templateId = "template_j773w8h";
    const userId = "G-5XyfNHUsUyFnEgU";
    var params = {
      otp: otp,
      from_name: "jainoddin_project",
      toemail: email,
    };

    emailjs.send(serviceId, templateId, params, userId).then(
      (response) => {
        console.log("Email sent successfully!", response.status);
      },
      (error) => {
        console.log("Error sending email:", error);
      }
    );
  };

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apilist.signup, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(FormData),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      if (popupRef.current) {
        popupRef.current.classList.add("open");
      }
      setemailValue(e.target.value);
      setEmail(emailValue);
      setOtp("");
      setSendingOTP(true);
      const otpValue = generateOTP();
      setOtp(otpValue);
      sendOTPToEmail(FormData.email, otpValue);
      setSendingOTP(false);

      setTimeout(() => {
        setOtpSent(true);
      }, 2000);
    } catch (err) {
      console.error("Error registering user:", err.message);
      toast.error("User already exist");
    }
  };

  const handleResendClick = () => {
    setOtp("");
    setEmail(FormData.email);

    setSendingOTP(true);
    const otpValue = generateOTP();
    setOtp(otpValue);
    sendOTPToEmail(FormData.email, otpValue);
    setSendingOTP(false);
    setOtpSent(true);
  };

  const handleInputChange = (text) => {
    setOtpValue(text); // Update OTP value state
  };

  const Login = () => {
    navigateFunc("/");
  };

  const HandleFormData = (e) => {
    const { name, value } = e.target;
    SetFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [FormData, SetFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const otpcomper = otp;
  const verifyOTP2 = async (e) => {
    e.preventDefault();
    if (otpValue == otpcomper) {
      try {
        const response = await fetch("http://localhost:4000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(FormData),
        });
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
        console.log("User registered successfully!");
        navigateFunc("/Login");
      } catch (err) {
        console.error("Error registering user:", err.message);
        toast.error("Registration Failed! Try Again Later.");
      }
    } else {
      toast.error("invaild OTP");
    }
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      {!otpSent ? (
        <div className="LoginBgContainer">
          <div className="FormContainer">
            <form onSubmit={handleSubmit}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                className="LoginLogoImage"
              ></img>

              <div className="InputContainer">
                <label className="LabelInput" htmlFor="username">
                  USERNAME
                </label>
                <input
                  type="text"
                  className="UserInput"
                  placeholder="Enter your name"
                  value={FormData.name}
                  name="name"
                  onChange={HandleFormData}
                  required
                ></input>
                <label className="LabelInput" htmlFor="username">
                  Email
                </label>
                <input
                  type="email"
                  className="UserInput"
                  placeholder="Enter your email"
                  value={FormData.email}
                  name="email"
                  onChange={HandleFormData}
                  required
                ></input>
                <label className="LabelInput" htmlFor="Email">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="UserInput"
                  placeholder="Enter your password"
                  value={FormData.password}
                  name="password"
                  onChange={HandleFormData}
                  required
                ></input>
                <div lassName="CheckboxContainer">
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                  ></input>
                  <label className="ShowPasswordLabel"> Show Password</label>
                </div>
                <button
                  className="LoginButton"
                  type="submit"
                  disabled={sendingOTP}
                >
                  {sendingOTP ? "Sending OTP..." : "Send OTP"}
                </button>
                {showSubmitError ? (
                  <p className="SubmitError">*Invalid username or password</p>
                ) : null}
                <p className="Login_p">
                  Already have an account ? <a onClick={Login}>Login</a>
                </p>
              </div>
              <div className="recovery-popup" ref={popupRef}>
                <div className="popup">
                  <div className="round-icon ">
                    <FontAwesomeIcon
                      icon={faEnvelopeOpenText}
                      style={{ fontSize: "50px" }}
                    ></FontAwesomeIcon>
                  </div>
                  <h5 style={{ fontSize: "20px" }}>Verification</h5>
                  <p>You will get a OTP via email</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="LoginBgContainer">
          <div className="FormContainer">
            <div className="">
              {" "}
              <h1 className="OTP_h1" style={{ paddingLeft: "30%" }}>
                OTP Verification
              </h1>
              <div className="OTP_p">
                <p style={{ paddingLeft: "10%" }}>
                  Please check your email wwww.uihut@gmail.com to see the
                  Verification code
                </p>
              </div>
            </div>
            <br></br>
            <div className="body">
              <form id="sendOTPForm" onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <OTPInput
                    value={otpValue}
                    onChange={handleInputChange}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    secure
                  />
                  <ResendOTP
                    style={{ padding: "10px" }}
                    onResendClick={handleResendClick}
                  />
                </div>
                <div className="c f"></div>
                <div class="wrap">
                  <button className="button" type="submit" onClick={verifyOTP2}>
                    Verify OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
