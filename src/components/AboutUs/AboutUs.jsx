import React from "react";
import AboutHero from "./AboutHero";
import AboutStory from "./AboutStory";
import AboutValues from "./AboutValues";
import AboutHow from "./AboutHow";
import AboutDifference from "./AboutDifference";
import FinalCTA from "../Home/FinalCTA";

const AboutUs = () => {
  return (
    <div className="bg-cream">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutHow />
      <AboutDifference />
      <FinalCTA />
    </div>
  );
};

export default AboutUs;