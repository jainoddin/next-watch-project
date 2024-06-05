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

const Saved = () => {
  const [videosArray, setVideoarray] = useState([]);
  const navigate = useNavigate();
  const [input, setinput] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/get-video-savedetail?saved=Saved"
      );
      console.log(response.data);
      setVideoarray(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  const token = Cookies.get("jwtAuth");
  console.log(token);

  useEffect(() => {
    if (token === undefined) {
      navigate("/auth");
    }
  }, []);

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
            className="col-md-9 container"
            style={{
              position: "absolute",
              top: "15%",
              left: "20%",
              width: "100%",
            }}
          >
            <div className="col-12 vh">
              <section
                className="input_group_search container my-1"
                style={{ position: "relative", left: "-30px", top: "-20px" }}
              >
                <div style={{ paddingBottom: "10px" }}>
                  <h1>
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
                <div>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png" style={{width:"50%",position:"relative",left:"240px"}}></img>
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
