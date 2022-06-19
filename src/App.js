import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Weather from "./Components/WeatherApp";

import ProfileCard from "./Components/Profile";
import "./App.css";

export default function App() {
  return (
    <div>
      <Router>
        <div className="Navbar">
          <Link className='item' to="/">Weather API Data</Link>
          <Link className='item' to="/profile">Profile</Link>
        </div>

        <Routes>
          <Route path="/" element={<Weather />}></Route>
          <Route path="/profile" element={<ProfileCard />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
