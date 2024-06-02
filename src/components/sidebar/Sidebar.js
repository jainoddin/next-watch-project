import React, { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { HiFire } from "react-icons/hi";
import { SiYoutubegaming } from "react-icons/si";
import { CgPlayListAdd } from "react-icons/cg";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const activeTabBg = props.data ? "#475569" : "#cbd5e1";
  console.log("sssssssssss", props.data);
  const [activeTab, setActiveTab] = useState("");
  const [backb, setbackb] = useState("White");
  const [textcolor, setTextcolor] = useState(true);
  const [active, setactive] = useState("active");
  const [p, setp] = useState("p");
  useEffect(() => {
    if (props.data == "dark") {
      setbackb("black");
      setTextcolor(true);
    } else if (props.data === "white") {
      setbackb("white");
      setTextcolor(false);
    }
  }, [props.data]);

  const [cc, setcc] = useState(textcolor);
  console.log("color````", textcolor);

  const logouthandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const activeclass2 = () => {
    setActiveTab("Trending");
    setactive(null);
  };
  const activeclass = () => {
    setActiveTab("Home");
  };
  const activeclass3 = () => {
    setActiveTab("Gaming");
  };
  const activeclass4 = () => {
    setActiveTab("Saved");
  };

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
                    backgroundColor: activeTab === "Home" ? "Lavender" : "",
                  }}
                  onClick={activeclass}
                >
                  <AiFillHome
                    size={30}
                    color={activeTab === "Home" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText" style={{ marginTop: "20px",color:"#9FACB7" }}>
                    Home
                  </p>
                </div>
              </div>

              <div className="NavLink">
                <div
                  className="NavLinkContainer "
                  style={{
                    backgroundColor: activeTab === "Trending" ? "Lavender" : "",
                  }}
                  onClick={activeclass2}
                >
                  <HiFire
                    size={30}
                    color={activeTab === "Trending" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText" style={{ color:"#9FACB7", }}>Trending</p>
                </div>
              </div>

              <div className="NavLink">
                <div
                  className="NavLinkContainer"
                  style={{
                    backgroundColor: activeTab === "Gaming" ? "Lavender" : "",
                  }}
                  onClick={activeclass3}
                >
                  <SiYoutubegaming
                    size={30}
                    color={activeTab === "Gaming" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText" style={{ color:"#9FACB7", }}>Gaming</p>
                </div>
              </div>

              <div className="NavLink">
                <div
                  className="NavLinkContainer"
                  style={{
                    backgroundColor: activeTab === "Saved" ? "Lavender" : "",
                  }}
                  onClick={activeclass4}
                >
                  <CgPlayListAdd
                    size={30}
                    color={activeTab === "Saved" ? "#ff0b37" : "#909090"}
                  />
                  <p className="NavText" style={{ color:"#9FACB7", }}>Saved</p>
                </div>
              </div>

              <div className="ContactHeading">
                {!textcolor ? (
                  <p>
                    <span style={{ color: "green" }}>CONTACT US</span>
                  </p>
                ) : (
                  <p>
                    <span style={{ color:"#ABCCEB", }}>CONTACT US</span>
                  </p>
                )}{" "}
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
              <div className="ContactNote" style={{ color:"#909090", }}>
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
