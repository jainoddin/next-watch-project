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
import apilist from "../../apilist/Apilist";

const IndividualVideo = () => {
  const [videoDetails, setVideoDetails] = useState({ savedStatus: "Not saved" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true); // State for managing animation
  const navigate = useNavigate();
  const { id } = useParams();
  const [color,setcolor]=useState("");
  const [count,setcount]=useState(0)

  useEffect(() => {
    fetchVideoDetails();
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
      const response1 = await axios.get(`${apilist.individualgamingvideo}/${id}`);
      const response2 = await axios.get(`${apilist.individualvideo}/${id}`);
      setVideoDetails({ ...response1.data, ...response2.data });
    } catch (error) {
      console.log(error);
    }
  };
console.log("countaa",count)
  const handlelikeSave = async () => {
    setcount(count+1)
    console.log(`Updating video with ID: ${videoDetails._id}`);
    let success = false;

    try {
      const response1 = await axios.put(`${apilist.updatelikevideo}/${videoDetails._id}?liked=true`);
      console.log("First API call success:", response1);
      success = true; 
    } catch (error) {
      console.error("Error in first API call:", error);
    }

    try {
      const response2 = await axios.put(`${apilist.updategaminglikevideo}/${videoDetails._id}?liked=true`);
      console.log("Second API call success:", response2);
      success = true; 
    } catch (error) {
      console.error("Error in second API call:", error);
    }

   
    if (count % 2 === 0) {
      setcolor("color1");
    } else {
      setcolor("s");
    }
  };

  const handleDoubleClick = () => {
    setcolor("s")
    window.location.reload();

    
  };

  const toggleSavedStatus = async () => {
    const newStatus = videoDetails.saved === "Saved" ? "Unsaved" : "Saved";
    setVideoDetails({ ...videoDetails, saved: newStatus });
    let success = false;

    try {
      const response1 = await axios.put(`${apilist.updatesavevideo}/${id}/save`, { saved: newStatus });
      console.log("First API call success:", response1);
      success = true; 
    } catch (error) {
      console.error("Error in first API call:", error);
    }
    try {
      const response2 = await axios.put(`${apilist.updategamingsavevideo}/${id}/save`, { saved: newStatus });
      console.log("Second API call success:", response2);
      success = true; 
    } catch (error) {
      console.error("Error in second API call:", error);
    }

    if (success) {
      toast.success("Video saved successfully updated");
      window.location.reload();
    }
  };

  const handledislikeSave = async () => {
    console.log(`Disliking video with ID: ${videoDetails._id}`);
    let success = false;

    try {
      const response1 = await axios.put(`${apilist.updateunlikevideo}/${videoDetails._id}?liked=false`);
      console.log("First API call success:", response1);
      success = true; 
    } catch (error) {
      console.error("Error in first API call:", error);
    }

    try {
      const response2 = await axios.put(`${apilist.updategamingunlikevideo}/${videoDetails._id}?liked=false`);
      console.log("Second API call success:", response2);
      success = true; 
    } catch (error) {
      console.error("Error in second API call:", error);
    }

    if (success) {
      toast.success("Video like successfully updated");
      window.location.reload();
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
                <p className="mx-2" style={{ fontSize: "13px", paddingTop: "4px" }}>{videoDetails.subscribers}</p>
                <p className="mx-2" style={{ fontSize: "13px", paddingTop: "4px" }}>{videoDetails.published_date}</p>

                <div className="d-flex justify-content-space-between">
                  <button
                    className={`mx-2 ${isAnimating ? "animating" : ""}`}
                    style={{
                      position: "absolute",
                      left: "235%",
                      border: "none",
                      display: "flex",
                      backgroundColor: "transparent",
                    }} 
                    id="likebtn"
                    onClick={handlelikeSave}
                    onDoubleClick={handleDoubleClick}
                  >
                    <p>
                     
                        <span id={color}>
                          <i className="ri-thumb-up-fill" id="i"></i>
                        </span>
                     
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
