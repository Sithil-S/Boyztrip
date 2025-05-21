import React from "react";
import "./Hero.css";
import herovid from "../../assets/hero/herovid.mp4"
import HeroTitle from "./HeroTitle";

const Hero = () => {
  return (
    <div className="hero">
      <video
        className="hero__video"
        src={herovid}
        autoPlay
        muted
        loop
      />
      <div>
        <HeroTitle/>
      </div>
    </div>
  );
};

export default Hero;