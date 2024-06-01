import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [showSubmitError, setShowSubmitError] = useState(false);
  return (
    <div className="LoginBgContainer">
      <div className="FormContainer">
        <form>
            
            <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            className="LoginLogoImage"
          ></img>

            
         
          <div className="InputContainer">
            <label className="LabelInput" htmlFor="username">
              USERNAME
            </label>
            <input type="text" className="UserInput"></input>
            <label className="LabelInput" htmlFor="username">
              Password
            </label>
            <input type="password" className="UserInput"></input>
            <div lassName="CheckboxContainer">
              <input type="checkbox"></input>
              <label className="ShowPasswordLabel"> Show Password</label>
              <label className="ShowPasswordLabel"> <a>Forget password?</a></label>

            </div>
            <button className="LoginButton">Login</button>
            {showSubmitError ? (
              <p className="SubmitError">*Invalid username or password</p>
            ) : null}
            <p className="Login_p">Don't have an account ? <a>Signup</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
