import React from "react";
import "./index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/NavbarNotUsed";
import Model from "./pages/Model";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import SideBar from "./components/Sidebar";
import Home from "./pages/Home";
import MercedesGWagon from "./models/mercedesGWagon";
import ModelGWagon from "./pages/ModelGWagonModel";
import ModelPorscheGT3 from "./pages/ModelPorscheGT3";

function App() {
  return (
    <main
      className="
    bg-black relative
    main
    "
    >
      <Router>
        {/* <Navbar /> */}
        {/* <SideBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/BMWM6" element={<Model />} />
          <Route path="/MercedesG63" element={<ModelGWagon />} />
          <Route path="/PorscheGT3" element={<ModelPorscheGT3 />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
