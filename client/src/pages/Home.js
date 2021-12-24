import React from "react";
import Navbar from "../components/Navbar";
import CodeBox from "../components/CodeBox";
import FullScreen from "../components/FullScreen";

const Home = () => {
  return (
    <FullScreen>
      <Navbar />
      <CodeBox />
    </FullScreen>
  );
};

export default Home;
