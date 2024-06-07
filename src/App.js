import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup/Signup.js";
import Home from "./components/Home/Home.js";
import Login from "./components/Login/Login.js";
import Forgetpassword from "./components/forgotpassword/Forgetpassword.js";
import Header from "./components/Header/Header.js";
import Sidebar from "./components/sidebar/Sidebar.js";
import IndividualVideo from "./components/individualVideos/IndividualVideos.js";
import Trending from "./components/Trending/Trending.js";
import Gaming from "./components/Gaming/Gaming.js";
import Saved from "./components/Saved/Saved.js";


function App() {
  return (
    <>
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
          <Route path="/head" element={<Header />}></Route>
          <Route path="/side" element={<Sidebar />}></Route>
          <Route path="/video" element={<IndividualVideo />}></Route>
          <Route path="/trending" element={<Trending />}></Route>
          <Route path="/gaming" element={<Gaming />}></Route>
          <Route path="/saved" element={<Saved />}></Route>

          
          <Route
            path="/video/:id"
            element={<IndividualVideo></IndividualVideo>}
          ></Route>



        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
