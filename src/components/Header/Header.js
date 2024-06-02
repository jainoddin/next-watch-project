import React from "react";
import "remixicon/fonts/remixicon.css";
import "./Header.css"
import { useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
import Sidebar from "../sidebar/Sidebar";

const Header = (props) => {
  const [clicked, setClicked] = useState(false);
  const [isSun, setIsSun] = useState(true);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const [d,setd]=useState("white")
  const [img,setimg]=useState("https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png")

  if (popupRef.current) {
    popupRef.current.classList.add("open");
  }

 

console.log("color",d)
  const handleClick = () => {
    setClicked(!clicked);
  };
  const data=d;

  const toggleIcon = () => {
    setIsSun(!isSun);
    document.body.classList.toggle("dark-mode", isSun);
   
    setd(isSun ? "dark" : "white");
    setimg(isSun ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png":"https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png");
    
  };
  
  const headerStyle = {
    backgroundColor: 'blue',
   
  };

  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="a">
      <nav
  className={`navbar navbar-light bg-${d} justify-content-between`}
  id="navbar" 
      >
        <img src={img} style={{width:"15%",paddingLeft:"10px"}}></img>

        <form
          class="form-inline"
          className={clicked ? "form-inline active" : "form-inline"}
        >
          <div onClick={toggleIcon} className="link-bar icon-sm">
            {isSun ? (
              <p>
                <i class="ri-moon-fill"></i>
              </p>
            ) : (
              <p>
                <i class="ri-sun-line" style={{color:"white"}}></i>
              </p>
            )}
          </div>
          <div class="nav-link">
           
            <i class="ri-account-circle-fill" style={{fontSize:"250%", color:"rgb(164, 204, 236)"}}></i>{" "}
           
          </div>
          <button
            class="btn btn-secondary my-2 my-sm-0 b"
            type="submit"
            onClick={logouthandler}
          >
            Logout
          </button>
        </form>

        <div>
          
        </div>
      </nav>
      <div style={{position:"fixed",top:"600%",left:"40%"}}>  <Sidebar data={data}></Sidebar>

      </div>
      
    
    </div>
  );
};

export default Header;