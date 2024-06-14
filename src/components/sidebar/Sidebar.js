import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import "./Sidebar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { CgPlayListAdd } from "react-icons/cg";
import Cookies from "js-cookie";
import { AiFillLike } from "react-icons/ai";


const Sidebar = (props) => {
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Home"); // Set default active tab to "Home"
  const activeTabBg = props.data ? "black" : "green";

  const [backb, setbackb] = useState("White");
  const [textcolor, setTextcolor] = useState(true);

  useEffect(() => {
    if (props.data === "dark") {
      setbackb("black");
      setTextcolor(true);
    } else if (props.data === "white") {
      setbackb("white");
      setTextcolor(false);
    }
  }, [props.data]);

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

  const handleTabClick = (tab, path) => {
    setActiveTab(tab);
    navigate(path);
  };
  
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  useEffect(() => {
    console.log("Token in useEffect:", token);
    if (token === null) {
      navigate("/auth");
    }
  }, [token, navigate]);

  return (
    <div className={`sidebar-components bgg-${backb}`}>
      <div className={`NavBar`}>
        <section>
          <div className="NavigationLgContainer">
            <div className="NavOptions">
              <div className="NavLink">
                <div
                  className={`NavLinkContainer`}
                  style={{
                    backgroundColor:
                      props.data === "dark"
                        ? ""
                        : activeTab === "Home"
                        ? "Lavender"
                        : "",
                  }}
                  onClick={() => handleTabClick("Home", "/home")}
                >
                  <AiFillHome
                    size={30}
                    color={activeTab === "Home" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText" style={{ marginTop: "20px" }}>
                    Home
                  </p>
                </div>
              </div>

              <div className="NavLink">
                <div
                  className="NavLinkContainer"
                  style={{
                    backgroundColor: activeTab === "Trending" ? "Lavender" : "",
                  }}
                  onClick={() => handleTabClick("Trending", "/trending")}
                >
                  <HiFire
                    size={30}
                    color={activeTab === "Trending" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText">Trending</p>
                </div>
              </div>

              <div className="NavLink">
                <div
                  className="NavLinkContainer"
                  style={{
                    backgroundColor: activeTab === "Gaming" ? "Lavender" : "",
                  }}
                  onClick={() => handleTabClick("Gaming", "/gaming")}
                >
                  <SiYoutubegaming
                    size={30}
                    color={activeTab === "Gaming" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText">Gaming</p>
                </div>
              </div>

              <div className="NavLink">
                <div
                  className="NavLinkContainer"
                  style={{
                    backgroundColor: activeTab === "Saved" ? "Lavender" : "",
                  }}
                  onClick={() => handleTabClick("Saved", "/saved")}
                >
                  <CgPlayListAdd
                    size={30}
                    color={activeTab === "Saved" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText">Saved</p>
                </div>
              </div>

              <div className="NavLink">
                <div
                  className="NavLinkContainer"
                  style={{
                    backgroundColor: activeTab === "Liked" ? "Lavender" : "",
                  }}
                  onClick={() => handleTabClick("Liked", "/Liked")}
                >
                  <AiFillLike 
                    size={30}
                    color={activeTab === "Liked" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText">Liked</p>
                </div>
              </div>

              <div className="ContactHeading">
                {!textcolor ? (
                  <p>
                    <span style={{ color: "green" }}>CONTACT US</span>
                  </p>
                ) : (
                  <p>
                    <span>CONTACT US</span>
                  </p>
                )}
              </div>
              <div className="ContactIcons">
                <img
                  className="ContactImage"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                ></img>
                <img
                  className="ContactImage"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                ></img>
                <img
                  className="ContactImage"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                ></img>
              </div>
              <div className="ContactNote" style={{ color: "#909090" }}>
                <p> Enjoy! Now to see your channels and recommendations!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;