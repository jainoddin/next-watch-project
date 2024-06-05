import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Sidebar from "../sidebar/Sidebar";
import "./Home.css";
import axios from "axios";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const apiStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE'
};

const Home = () => {
  const [videosArray, setVideosArray] = useState([]);
  const [originalVideos, setOriginalVideos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [banner, setBanner] = useState(true);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [bgcolor,setbgcolor]=useState("#909090");
  const navigate = useNavigate();

  const fetchDetails = async () => {
    setApiStatus(apiStatusConstants.loading);
    try {
      const response = await axios.get("http://localhost:4000/get-video-details");
      setVideosArray(response.data);
      setOriginalVideos(response.data); // Save the original list of videos
      setApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.log(error);
      setApiStatus(apiStatusConstants.failure);
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

  const fetchInputData = (value) => {
    const filteredVideos = originalVideos.filter((video) => {
      return (
        value &&
        video &&
        video.video_title &&
        video.video_title.toLowerCase().includes(value.toLowerCase())
      );
    });

    setVideosArray(filteredVideos);
  };

  const handleSearch = () => {
    console.log('Fetching data with input:', inputValue);
    fetchInputData(inputValue);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  

  const bannerClose = () => {
    setBanner(false);
  };

  useEffect(() => {
    if (apiStatus === apiStatusConstants.loading) {
      document.body.style.backgroundColor = "blue";
    } else {
      document.body.style.backgroundColor = "";
    }
  }, [apiStatus]);

  const renderLoadingView = () => (
    
    <div className="loader-container">
    
      <div className="loader">
        <section class="wrapper">
      <div class="loader">
        <div class="loading one"></div>
        <div class="loading two"></div>
        <div class="loading three"></div>
        <div class="loading four"></div>
      </div>
    </section>.</div>
    </div>
    
  );

  const renderFailureView = () => (
    <div className="failure-view">
      <div style={{position:"absolute",top:"80px",left:"20%"}}>
      <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" style={{width:"60%"}}></img>
      </div>
    </div>
  );

  const renderVideosView = () => {
    return (
      <div className="container" >
        <div className="row"  >
        {videosArray.length > 0 ? (
          videosArray.map((video) => (
            <div className="col-md-4 my-4" key={video.id} style={{marginRight:"-40px"}}>
              <p>
               <Link to={`/video/${video._id}`}   style={{ textDecoration: "none"}}>
              <div className="thumbnail_image">
                <img
                  style={{ width: "80%" }}
                  src={video.thumbnail_url}
                  alt={video.video_title}
                />
              </div>

              <div className="home_thumbnail_title d-flex">
                <div className="channel_logo channellogo">
                  <img
                    src={video.channel_logo}
                    style={{ width: "30px", paddingTop: "10px" }}
                    alt={video.channel_name}
                  />
                </div>
                <h6 className="my-3 d-flex" style={{ width: "60%" }}>
                  {video.video_title}
                </h6>
              </div>

              <div className="home_channel_description d-flex">
                <div
                  className="channel_description"
                  style={{ paddingLeft: "35px", fontSize: "13px" }}
                >
                  <p>{video.channel_name}</p>
                  <p style={{ marginTop: "-10px", fontSize: "13px" }}>
                    {video.views_count} views
                    <span style={{ paddingLeft: "10px" }}>
                      .&nbsp;&nbsp;&nbsp;&nbsp;{video.published_date}
                    </span>
                  </p>
                </div>
               
              </div>
              </Link>
              </p>
            </div>
           
          ))
        ) : (
          <p>No videos found</p>
        )}

        </div>
      </div>
    );
  };

  const renderHomeVideos = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderVideosView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div id="home-container">
      <section className="nav_bar_component">
        <Header
        
        />
      </section>
      <section className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar/>
          </div>
          <div className="col-md-9 container" id="a">
            {banner && (
              <section
                className="banner_component text-center d-flex align-items-center justify-content-center"
                style={{ width: "115%",position:"relative" ,left:"-9.6%"}}
              >
                <div className="img-banner">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    style={{ width: "120px" }}
                    alt="banner"
                  />
                </div>
                <p className="text">
                  Buy Nxt Watch Premium prepaid plans with <br />
                  <span className="banner-span">UPI</span>
                </p>
                <div>
                  <button className="banner-button">GET IT NOW</button>
                </div>
                <div className="banner-icon">
                  <button className="bannerclose-button" onClick={bannerClose}>
                    <AiOutlineClose size={25} />
                  </button>
                </div>
              </section>
            )}

            <div className="aaaaaa"
              style={{
              
                position: "relative",
                left: "-90px",
                top: "-34px",
                height: "auto",
                width:"115%"
                
              }}
            >
              <section
                className="input_group_search container my-1"
                style={{ position: "relative", left: "0px", top: "20px" }}
              >
                <div className="input-group mb-3" style={{ width: "50%" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    id="basic-addon2"
                    style={{ backgroundColor: "#909090" }}
                    onClick={handleSearch}
                  >
                    <AiOutlineSearch size={20} />
                  </button>
                </div>
              </section>

              <section className="thumbnails_layout" style={{ position: "relative", left: "0px" }}>
                {renderHomeVideos()}
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
