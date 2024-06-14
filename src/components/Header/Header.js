import React, { useState, useEffect, useContext, useRef } from "react";
import "remixicon/fonts/remixicon.css";
import "./Header.css";
import { useNavigate,useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import apilist from "../../apilist/Apilist";
import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { CgPlayListAdd } from "react-icons/cg";
import { AiFillLike } from "react-icons/ai";




const Header = (props) => {
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);
  const [clicked, setClicked] = useState(false);
  const [isSun, setIsSun] = useState(true);
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState({});
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();
  const [siderbar,setsidebar]=useState(false)
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [theme, setTheme] = useState("white");
  const [activeTab, setActiveTab] = useState("Home"); // Set default active tab to "Home"
  const location = useLocation();

  const [logo, setLogo] = useState(
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
  );

  // Assuming rectRef is defined elsewhere as a ref to the target element

  const handleClick = () => {
    setClicked(!clicked);
  };


  useEffect(() => {
    // Update activeTab based on the current path
    if (location.pathname === "/home") {
      setActiveTab("Home");
    } else if (location.pathname === "/trending") {
      setActiveTab("Trending");
    } else if (location.pathname === "/gaming") {
      setActiveTab("Gaming");
    } else if (location.pathname === "/saved") {
      setActiveTab("Saved");
    }
    else if (location.pathname === "/Liked") {
      setActiveTab("Liked");
    }
  }, [location.pathname]);

  const toggleIcon = () => {
    const newIsSun = !isSun;
    setIsSun(newIsSun);
    document.body.classList.toggle("dark-mode", newIsSun);
    setTheme(newIsSun ? "dark" : "white");
    setLogo(
      newIsSun
        ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
        : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
    );

    // Store the state in local storage
    localStorage.setItem("iconState", newIsSun ? "sun" : "moon");
  };

  useEffect(() => {
    const storedIconState = localStorage.getItem("iconState");
    if (storedIconState === "sun") {
      setIsSun(true);
      document.body.classList.add("dark-mode");
      setTheme("dark");
      setLogo(
        "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
      );
    } else if (storedIconState === "moon") {
      setIsSun(false);
      document.body.classList.remove("dark-mode");
      setTheme("white");
      setLogo(
        "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
      );
    }
  }, []);

  const logouthandler = () => {
    localStorage.removeItem("token");
    setToken(null); // Update the state to reflect token removal
    console.log("Token removed:", localStorage.getItem("token") === null); // Should print true
    navigate("/"); // Navigate after token removal
    console.log("jwttokenqqqqqq", token);
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get(apilist.getuserdetils);
      setUserData(response.data);
      console.log("userData:", response.data);

      // Fetch the user's image
      const imageResponse = await axios.get(`${apilist.getimg}/${email}`);
      console.log("imageResponse:", imageResponse.data);

      if (imageResponse.data.status === "ok") {
        const base64Image = imageResponse.data.data.image;
        setImage(base64Image);
        localStorage.setItem("userImage", base64Image); // Save the image to local storage
        console.log("Image fetched successfully", base64Image);
      } else {
        console.error("Failed to fetch image", imageResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedImage = localStorage.getItem("userImage");
    if (storedImage) {
      setImage(storedImage);
    } else {
      fetchDetails();
    }
  }, []);

  console.log("userrrrrr", email);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result;

        // Send the image and user_id to the backend
        try {
          const response = await fetch(apilist.uploadimg, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: email,
              base64: base64Image,
            }),
          });

          const data = await response.json();
          if (data.Status === "ok") {
            console.log("Image uploaded successfully");
            setImage(base64Image); // Update the image state with the new image
            localStorage.setItem("userImage", base64Image); // Save the new image to local storage
          } else {
            console.error("Error uploading image", data);
          }
        } catch (error) {
          console.error("Error uploading image", error);
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type or no file selected");
    }
  };

  const handleImageClick = () => {
    // Programmatically trigger click event on the hidden file input
    const fileInput = document.getElementById("imageUpload");
    fileInput.click();
  };


  const handleTabChange2=()=>{
    navigate("/trending")
  }
  const handleTabChange1=()=>{
    navigate("/home")
  }
  const handleTabChange3=()=>{
    navigate("/gaming")
  }
  const handleTabChange4=()=>{
    navigate("/saved")
  }
  const handleTabChange5=()=>{
    navigate("/Liked")
  }

  return (
    <div className="header">
      <nav
        className={`navbar navbar-light bg-${theme} justify-content-between`}
        id="navbar"
      >
        <img
          src={logo}
          alt="Logo"
          style={{  paddingLeft: "10px" }}
          className="nav-img1"
        />

        <form className={`form-inline ${clicked ? "active" : ""}`}>
          <div onClick={toggleIcon} className="link-bar icon-sm">
            {isSun ? (
              <p>
                <i className="ri-sun-line"></i>
              </p>
            ) : (
              <p>
                <i className="ri-moon-fill"></i>
              </p>
            )}
          </div>
          <div className="nav-link">
            <img
              src={image}
              alt="Uploaded"
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                position: "relative",
                top: "13px",
                cursor: "pointer", // Add cursor pointer
              }}
              onClick={handleImageClick} // Add onClick event handler
              onError={() => console.error("Image failed to load")}
            />
            <InputText
              type="file"
              id="imageUpload"
              className="inputt"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          <button
            className="btn btn-secondary my-2 my-sm-0 b"
            type="button"
            onClick={logouthandler}
          >
            Logout
          </button>
        </form>
      </nav>




      
      <nav className="navbar2">
        <div>
          <ul>
            <li> <button onClick={handleTabChange1} style={{border:"none",backgroundColor:"rgb(235, 231, 231)"}}><AiFillHome className="c1"  color={activeTab === "Home" ? "#ff0b37" : "#909090"}   name="Home" /> </button></li>

            <li> <button onClick={handleTabChange2} style={{border:"none",backgroundColor:"rgb(235, 231, 231)"}}><HiFire className="c1" color={activeTab === "Trending" ? "#ff0b37" : "#909090"} /></button></li>
            <li><button  onClick={handleTabChange3} style={{border:"none",backgroundColor:"rgb(235, 231, 231)"}}><SiYoutubegaming className="c1" color={activeTab === "Gaming" ? "#ff0b37" : "#909090"}></SiYoutubegaming></button></li>
            <li><button  onClick={handleTabChange4}  style={{border:"none",backgroundColor:"rgb(235, 231, 231)"}}><CgPlayListAdd className="c1" color={activeTab === "Saved" ? "#ff0b37" : "#909090"}></CgPlayListAdd></button></li>
            <li><button  onClick={handleTabChange5} style={{border:"none",backgroundColor:"rgb(235, 231, 231)"}}><AiFillLike className="c1"  color={activeTab === "Liked" ? "#ff0b37" : "#909090"}></AiFillLike></button></li>
          </ul>
        </div>

      </nav>













      <div style={{ position: "fixed", top: "600%", left: "40%" }}>
        {!siderbar ?(<Sidebar data={theme}></Sidebar>) : (<></>)}

      </div>
    </div>
  );
};

export default Header;