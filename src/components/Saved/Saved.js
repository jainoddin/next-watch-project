import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CgPlayListAdd } from "react-icons/cg";
import Cookies from "js-cookie";
import apilist from "../../apilist/Apilist";
import './Saved.css'


const Saved = () => {
  const [videosArray, setVideoarray] = useState([]);
  const navigate = useNavigate();
  const [input, setinput] = useState("");

  const fetchDetails = async () => {
    try {
      const response1 = await axios.get(
        apilist.SavedVideos
      );
      const response2 = await axios.get(
        apilist.gamingSavedVideos
      );
      console.log(response1.data);
      setVideoarray([...response1.data, ...response2.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
 
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  useEffect(() => {
    console.log("Token in useEffect:", token);
    if (token === null) {
      navigate("/auth");
    }
  }, [token, navigate]);

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

          <div
            className="col-md-9 container5"
           
          >
            <div className="col-12 vh">
              <section
                className="input_group_search container my-1"
                style={{ position: "relative", left: "-30px", top: "-20px" }}
              >
                <div style={{ paddingBottom: "10px" }}>
                  <h1 className="hh">
                    <CgPlayListAdd size={45} color="#ff0b37" />
                    <span
                      style={{
                        position: "relative",
                        top: "3.5px",
                        left: "5px",
                      }}
                    >
                      Saved
                    </span>
                  </h1>
                </div>
                {videosArray.length > 0 ? (
                videosArray.map((video) => (
                  <Link
                    to={`/video/${video._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    <div
                      className="trending-content"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={video.thumbnail_url}
                        style={{
                          width: "35%",
                          marginRight: "10px",
                          padding: "10px",
                        }}
                        alt="iB Hubs"
                      />
                      <div>
                        <p
                          style={{
                            margin: "0",
                            paddingBottom: "25px",
                            position: "relative",
                            top: "-10px",
                            left: "10px",
                          }}
                        >
                          {" "}
                          {video.video_title}
                        </p>
                        <p
                          style={{
                            margin: "0",
                            PaddingBottom: "25px",
                            position: "relative",
                            top: "-10px",
                            left: "10px",
                          }}
                        >
                          {video.channel_name}
                        </p>
                        <p
                          style={{
                            margin: "0",
                            PaddingBottom: "25px",
                            position: "relative",
                            top: "10px",
                            left: "10px",
                          }}
                        >
                          26K views<span> . Nov 29, 2016</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
                <>
                <div className="saveds">
                    <img className="jj" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" ></img>
                    <h1 style={{textAlign:"center",fontSize:"22px"}}><p>No saved videos found</p></h1>
                    <p style={{textAlign:"center"}}>You can save your videos while watching them</p>
                </div>
                </>
              )}
      
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Saved;
