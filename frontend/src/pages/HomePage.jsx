import React from "react";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import URLCreate from "../../component/URLCreate";
import ShowURLData from "../../component/ShowURLData";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <URLCreate />
      <ShowURLData />
      <Footer />
    </>
  );
};

export default HomePage;
