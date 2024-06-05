import React, { useState, useEffect, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Header = (props) => {
  const [clicked, setClicked] = useState(false);
  const [isSun, setIsSun] = useState(true);
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState({});
  const { email } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState("white");
  const [logo, setLogo] = useState(
    "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
  );

  const handleClick = () => {
    setClicked(!clicked);
  };

  const toggleIcon = () => {
    setIsSun(!isSun);
    document.body.classList.toggle("dark-mode", isSun);
    setTheme(isSun ? "dark" : "white");
    setLogo(
      isSun
        ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
        : "https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
    );
  };

  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/get-user-details");
      setUserData(response.data);
      console.log("userData:", response.data);

      // Fetch the user's image
      const imageResponse = await axios.get(`http://localhost:4000/get-image/${email}`);
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
          const response = await fetch("http://localhost:4000/upload-image", {
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

  return (
    <div className="header">
      <nav
        className={`navbar navbar-light bg-${theme} justify-content-between`}
        id="navbar"
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: "15%", paddingLeft: "10px" }}
        />

        <form className={`form-inline ${clicked ? "active" : ""}`}>
          <div onClick={toggleIcon} className="link-bar icon-sm">
            {isSun ? (
              <p>
                <i className="ri-moon-fill"></i>
              </p>
            ) : (
              <p>
                <i className="ri-sun-line" style={{ color: "white" }}></i>
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
                cursor: "pointer" // Add cursor pointer
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
      <div style={{ position: "fixed", top: "600%", left: "40%" }}>
        <Sidebar data={theme}></Sidebar>
      </div>
    </div>
  );
};

export default Header;





