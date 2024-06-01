import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.js";
import Signup from "./components/Signup/Signup.js";

function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
