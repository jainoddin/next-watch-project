import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { ToastContainer, toast } from "react-toastify";
import { SiYoutubegaming } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import apilist from "../../apilist/Apilist";


const Gaming = () => {
  const [videosArray, setVideoarray] = useState([]);
  const navigate = useNavigate();
  const [input, setinput] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        apilist.gamingvideos
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
                <div style={{ paddingBottom: "10px" ,paddingLeft:"20px"}}>
                  <h1>
                  <SiYoutubegaming
                    size={45} color="red" 
                  />
                    <span
                      style={{
                        position: "relative",
                        top: "3.5px",
                        left: "10px",
                      }}
                    >
                      Gaming
                    </span>
                  </h1>
                </div>
                <div className="container">
                  <div className="row">
                    {videosArray.length > 0 ? (
                      videosArray.map((video) => (
                        <div
                          className="col-md-4 my-2"
                          key={video.id}
                          style={{ marginRight: "0px"}}
                        >
                          <p>
                            <Link
                              to={`/video/${video._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <div
                                className="thumbnail_image"
                                style={{ paddingRight: "10px" }}
                              >
                                <img
                                  style={{ width: "108%", height: "300px" }}
                                  src={video.thumbnail_url}
                                  alt={video.video_title}
                                />
                              </div>

                              <div className="home_thumbnail_title d-flex">
                                <p>
                                  <h6 className="my-3 d-flex" style={{}}>
                                    {video.video_title}
                                  </h6>
                                </p>
                              </div>

                              <p
                                style={{
                                  margin: "0",
                                  PaddingBottom: "25px",
                                  position: "relative",
                                  top: "-20px",
                                  left: "-0px",
                                  fontSize: "12px",
                                }}
                              >
                                {video.views_count} Watching Worldwild
                              </p>
                            </Link>
                          </p>
                        </div>
                      ))
                    ) : (
                      <div>
         
         <section class="wrapper" style={{backgroundColor:"blue",width:"550%" }}>
      <div class="loader">
        <div class="loading one"></div>
        <div class="loading two"></div>
        <div class="loading three"></div>
        <div class="loading four"></div>
      </div>
    </section>
                      </div>
              )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gaming;
