import React, { useState, useCallback, useContext,useEffect  } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import cookie from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Forgetpassword from "../forgotpassword/Forgetpassword";
import AuthContext from "../context/AuthContext"
import apilist from "../../apilist/Apilist";

const Login = () => {
  const [showSubmitError, setShowSubmitError] = useState(false);
  const navigateFunc = useNavigate();

  const { email, setEmail } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const signup = () => {
    navigateFunc("/signup");
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleCheckboxChange = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword, setShowPassword]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(apilist.login, {
        email,
        password,
      });
      const data = response.data;

      localStorage.setItem("token", data.token);

      cookie.set("jwtAuth", data.token);
      console.log("jwttoken",data.token)
    
      console.log("User Login successfully!");
      toast.success("Logged in Successfully!");
      console.log(data.password);

      navigateFunc("/Home");
    } catch (err) {
      console.log(err);
      toast.error("Invalid Credentials!");
    }
  };
  const Forgetpassword=()=>{
    navigateFunc("/forgetpassword");
  }



 
  return (
    <>
      <ToastContainer />
      <div className="LoginBgContainer">
        <div className="FormContainer">
          <form onSubmit={submitHandler}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              className="LoginLogoImage"
            ></img>

            <div className="InputContainer">
              <label className="LabelInput" htmlFor="username">
                USER Email
              </label>
              <input
                type="text"
                className="UserInput"
                value={email}
                name="Email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <label className="LabelInput" htmlFor="username">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="UserInput"
                placeholder="Enter your password"
                value={password}
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <div lassName="CheckboxContainer">
                <input type="checkbox" onChange={handleCheckboxChange}></input>
                <label className="ShowPasswordLabel"> Show Password</label>
                <label className="forPasswordLabel">
                  {" "}
                  <a onClick={Forgetpassword}>Forget password?</a>
                </label>
              </div>
              <button className="LoginButton">Login</button>
              {showSubmitError ? (
                <p className="SubmitError">*Invalid username or password</p>
              ) : null}
              <p className="Login_p">
                Don't have an account ? <a onClick={signup}>Signup</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
