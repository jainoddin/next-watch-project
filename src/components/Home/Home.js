import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [videosArray, setVideoarray] = useState([]);
  const navigate = useNavigate();
  const [input, setinput] = useState("");

  /*const fetchDetails = async () => {
    try {
      const response = await axios.get(apilist.getallvideos);
      setVideoarray(response.data);
    } catch (error) {
      console.log(error);
    }
  };*/

  //useEffect(() => {
   // fetchDetails();
  //}, []);

  const token = Cookies.get("jwtAuth");
  console.log(token);

  //useEffect(() => {
    //if (token === undefined) {
      //navigate("/auth");
    //}
  //}, []);

  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = isSun && isDark ? "black" : "white";
    console.log("isSun before toggle: ", isSun);


    
  };

  const [isSun, setIsSun] = useState(true);

  const toggleIcon = () => {
    console.log("Toggle icon clicked");
    console.log("isSun before toggle: ", isSun);
    console.log("isDark before toggle: ", isDark);
    setIsSun(!isSun);
    setIsDark(!isDark);
    console.log("isSun after toggle: ", isSun);
    console.log("isDark after toggle: ", isDark);
    changeBackgroundColor();
  };

  const [isDark, setIsDark] = useState(false);

  const toggleBackgroundColor = () => {
    setIsDark(!isDark);
    console.log("isDark before toggle: ", isDark);

  };

  // console.log(videosArray);
  /*const fetchinputdata = (value) => {
    const filteredVideos = videosArray.filter((video) => {
      return (
        value &&
        video &&
        video.video_title &&
        video.video_title.toLowerCase().includes(value)
      );
    });
    setVideoarray(filteredVideos);


  };
  const handlechange = (value) => {
    setinput(value);
    fetchinputdata(value);

  };*/

  return (
    <div id="home-container">
      <section className="nav_bar_component">
        <Header
          isSun={isSun}
          changeBackgroundColor={changeBackgroundColor}
          toggleBackgroundColor={toggleBackgroundColor}
          toggleIcon={toggleIcon}
          setIsSun={setIsSun} 
        />{" "}
      </section>
      <section className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3" >

            
          <Sidebar isDark={isDark}/>
          
          
          
          
          
                   </div>
          <div className="col-md-9 container" id="a">
            <section className="banner_component text-center d-flex align-items-center  justify-content-center">
            <div className="search-box">    
      <div className="search-main">
        <div className="BannerContainer">
          <div className="BannerLeftPart">
            <div className="BannerImage">
<img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"></img>
            </div>
            <div className="BannerText">
            <p>Buy Nxt Watch Premium prepaid plans with <br /> UPI</p>

            </div>
            <div className="BannerButton"><p>GET IT NOW</p></div>

          </div>
          </div>
       
       
      </div>
    </div>
            </section>

            <section className="input_group_search container my-5">
             <div><h1>aaaaaa</h1></div>
            </section>

            <section className="thumbnails_layout">
            <div><h1>bbbbbbbb</h1></div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;