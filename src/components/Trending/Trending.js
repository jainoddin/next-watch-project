import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import { HiFire } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import apilist from "../../apilist/Apilist";


const Trending = () => {
  const [videosArray, setVideoarray] = useState([]);
  const navigate = useNavigate();
  const [input, setinput] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        apilist.trendingvideos
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
                    <HiFire size={45} color="#ff0b37" />
                    <span
                      style={{
                        position: "relative",
                        top: "3.5px",
                        left: "5px",
                      }}
                    >
                      Trending
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
                          {video.views_count} views<span> . {video.published_date}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))) : (
                  <div>
     
     <section class="wrapper" style={{backgroundColor:"blue",width:"120%" }}>
  <div class="loader">
    <div class="loading one"></div>
    <div class="loading two"></div>
    <div class="loading three"></div>
    <div class="loading four"></div>
  </div>
</section>
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

export default Trending;
