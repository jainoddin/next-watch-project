import React, { useEffect, useState } from "react";
import Navbar from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import apilist from "../../apilist/Apilist";

const Liked = () => {
  const [videosArray, setVideoArray] = useState([]);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    try {
        const [response1, response2] = await Promise.all([
          axios.get("http://localhost:4000/get-likevideo-by-queryy?liked=true"),
          axios.get("http://localhost:4000/get-likegamingvideo-by-queryy?liked=true")
        ]);
  
        const combinedData = [...response1.data, ...response2.data];
        setVideoArray(combinedData);
      } catch (error) {
        console.log("Error fetching videos:", error);
      }
  
     
    
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
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
                    <AiFillLike size={45} color="#ff0b37" />
                    <span
                      style={{
                        position: "relative",
                        top: "3.5px",
                        left: "5px",
                      }}
                    >
                      Liked
                    </span>
                  </h1>
                </div>
                {videosArray.length > 0 ? (
                  videosArray.map((video) => (
                    <Link
                      to={`/video/${video._id}`}
                      style={{ textDecoration: "none" }}
                      key={video._id}
                    >
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
                          alt="thumbnail"
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
                            {video.views_count}  views<span> . {video.published_date}</span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                      style={{
                        width: "50%",
                        position: "relative",
                        left: "240px",
                      }}
                      alt="No Liked Videos"
                    />
                    <h1 style={{ textAlign: "center", fontSize: "22px" }}>
                      No Liked videos found
                    </h1>
                    <p style={{ textAlign: "center" }}>
                      You can Like your videos while watching them
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Liked;




