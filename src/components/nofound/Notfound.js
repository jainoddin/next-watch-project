import React from 'react';
import { useNavigate } from "react-router-dom";

const Notfound = () => {
    const navigate = useNavigate();
    const refreshpage=()=>{
        navigate("/")
    }
  return (
    <div style={{width:"30%",position:"relative",top:"90px",left:"35%"}}>
    
      <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png' style={{width:"90%"}} ></img>
      <h2 style={{paddingLeft:"13px"}}>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button class="buttonn" onClick={refreshpage}>Refresh</button>
    </div>
  );
};

export default Notfound;
