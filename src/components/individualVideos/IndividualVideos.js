import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import ReactPlayer from "react-player";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import "./IndividualVideos.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const IndividualVideo = () => {
  const [videoDetails, setVideoDetails] = useState({ savedStatus: "Not saved" });
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const navigate = useNavigate();// State to manage dark mode

  const { id } = useParams();

  useEffect(() => {
    fetchVideoDetails();
    
    // Check if dark mode is enabled in local storage or user preference
    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(darkModeEnabled);
    if (darkModeEnabled) {
      document.body.classList.add("dark-mode");
    }
  }, []);
  const token = Cookies.get("jwtAuth");
  console.log(token);

  useEffect(() => {
    if (token === undefined) {
      navigate("/auth");
    }
  }, []);

  const fetchVideoDetails = async () => {
    try {
      const response1 = await axios.get(`http://localhost:4000/individualvideoo/${id}`);
      const response2 = await axios.get(`http://localhost:4000/individualvideo/${id}`);
      setVideoDetails({ ...response1.data, ...response2.data });
    } catch (error) {
      console.log(error);
    }
  };

  
   

  

  const handlelikeSave = async () => {
    console.log(`Updating video with ID: ${videoDetails._id}`);
    try {
      const response = await axios.put(
        `http://localhost:4000/updatelikevideo/${videoDetails._id}?liked=true`
      );
      console.log("Success:", response);
      toast.success("Video like Successfully");

      

      window.location.reload();


    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleSavedStatus = async () => {
    const newStatus = videoDetails.saved === "Saved" ? "Unsaved" : "Saved";
    setVideoDetails({ ...videoDetails, saved: newStatus });

    try {
      const response = await axios.put(`http://localhost:4000/videos/${id}/save`, { saved: newStatus });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handledislikeSave = async () => {
    console.log(`Disliking video with ID: ${videoDetails._id}`);
    try {
      const response = await axios.put(`http://localhost:4000/updatelikevideo/${videoDetails._id}?liked=false`);
      console.log("Success:", response);
      toast.error("Video disliked successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="nav_bar_component">
        <Navbar />
      </section>
      <section className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9 container" style={{ position: "absolute", top: "15%", left: "22%", width: "100%" }}>
            <div className="col-12 vh">
              <ReactPlayer
                url={videoDetails.video_url}
                width={"111.5%"}
                height={"400px"}
                style={{ position: "relative", left: "-50px", top: "10px" }}
              />
            </div>
            <div className="col-12 cc">
              <p className="mt-3" style={{ fontSize: "20px" }}>{videoDetails.video_title}</p>
            </div>
            <div className="col-4">
              <div className="d-flex justify-content-space-between">
                <p className="mx-2" style={{ fontSize: "13px" ,paddingTop:"4px"}}>{videoDetails.subscribers}</p>
                <p className="mx-2" style={{ fontSize: "13px",paddingTop:"4px" }}>{videoDetails.published_date}</p>

                <div className="d-flex justify-content-space-between">
                  <button
                    className="mx-2"
                    style={{
                      position: "absolute",
                      left: "235%",
                      border: "none",
                      display: "flex",
                      backgroundColor: "transparent",
                    }} id="likebtn"
                    onClick={handlelikeSave}
                  >
                    <p>
                    {videoDetails.liked === "true" ? (
                      <span id="color1">
                        <i className="ri-thumb-up-fill" id="i"></i>
                      </span>
                    ) : (
                      <>
                        <i className="ri-thumb-up-fill" id="i"></i>
                      </>
                    )}
                    Like
                    </p>
                  </button>
                  <button
                    className="mx-2"
                    style={{
                      position: "absolute",
                      left: "253%",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                    }}
                    onClick={handledislikeSave}
                  >
                    <p>
                    <i className="ri-thumb-down-fill"></i>Dislike
                    </p>
                  </button>
                  <button
                    className="mx-0"
                    style={{
                      position: "absolute",
                      left: "280%",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                    }}
                    onClick={toggleSavedStatus}
                    id="save-icon"
                  >
                    <p>
                    {videoDetails.saved === "Saved" ? (
                      <>
                        
                          <i className="ri-bookmark-2-fill" id="i">Unsaved</i>
                       
                      </>
                    ) : (
                      <>
                        <i className="fa-regular fa-floppy-disk" style={{ paddingTop: "4px" }}></i> <p id="saved2">Saved</p>
                      </>
                    )}
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12">
              <hr size="15" width="102%" color="#424242" />
              <div className="d-flex" style={{ paddingRight: "90%", position: "relative", top: "0px", width: "195%" }}>
                <div>
                  <img
                    src={videoDetails.channel_logo}
                    style={{ height: "25px" }} width={"25px"}
                  />
                </div>
                <div>
                  <p
                    className="m-0"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      paddingLeft: "10px",
                      fontSize: "13px",
                      paddingBottom: "5px"
                    }}
                  >
                    {videoDetails.channel_name}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      paddingLeft: "10px",
                      fontSize: "12px",
                      paddingBottom: "15px"
                    }}
                  >
                    {videoDetails.views_count} Subscribers
                  </p>
                  <div>
                    <p
                      className="m-0"
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        paddingLeft: "10px",
                        paddingBottom:"30px"
                      }}
                      width="100%"
                    >
                      {videoDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndividualVideo;
