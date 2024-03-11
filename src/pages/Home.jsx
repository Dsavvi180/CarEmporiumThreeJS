import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className=" flex flex-col">
      <Navbar />
      <Banner />
      <div className="flex flex-row justify-center bg-[#F9F6EE]">
        <Cards />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
