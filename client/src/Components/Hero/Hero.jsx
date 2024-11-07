import React, { useEffect, useState } from "react";
import { Button } from "antd";
import arrow_icon from "../../Assets/arrow.png";
import hero_image from "../../Assets/hero_image.png";
import "animate.css"; 

const Hero = () => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center h-screen overflow-hidden hero">
      <div
        className={`p-8 flex flex-col justify-center items-center text-white bg-gradient-to-r ${
          isAnimated ? "animate__animated animate__fadeInLeft" : ""
        }`}
      >
        <h2
          className={`font-bold text-5xl lg:text-7xl mb-4 ${
            isAnimated ? "animate__animated animate__fadeInDown" : ""
          }`}
        >
          Asura Bot Discord
        </h2>
        <p
          className={`text-xl mb-6 ${
            isAnimated ? "animate__animated animate__fadeIn" : ""
          }`}
        >
          The ultimate bot for your Discord server, providing a seamless experience!
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2"> 
          {/* Invite Bot Button */}
          <Button
            type="primary"
            shape="round"
            size="large"
            className="flex items-center transition-transform transform hover:scale-105 w-full bg-black text-white border-white border-2"
            style={{
              height: "70px",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            <span className="mr-2">Invite Bot</span>
            <img src={arrow_icon} className="w-6 h-4" alt="Arrow Icon" />
          </Button>

          {/* Discord Support Button */}
          <Button
            type="default"
            shape="round"
            size="large"
            className="flex items-center transition-transform transform hover:scale-105 w-full bg-black text-white border-white border-2"
            style={{
              height: "70px",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            <span className="mr-2">Discord Support</span>
            <img src={arrow_icon} className="w-6 h-4" alt="Arrow Icon" />
          </Button>

          {/* Embed Builder Button */}
          <Button
            type="default"
            shape="round"
            size="large"
            className="flex items-center transition-transform transform hover:scale-105 w-full bg-black text-white border-white border-2"
            style={{
              height: "70px",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            <span className="mr-2">Embed Builder</span>
            <img src={arrow_icon} className="w-6 h-4" alt="Arrow Icon" />
          </Button>

          {/* Placeholder Button */}
          <Button
            type="default"
            shape="round"
            size="large"
            className="flex items-center transition-transform transform hover:scale-105 w-full bg-black text-white border-white border-2"
            style={{
              height: "70px",
              fontSize: "20px",
              fontWeight: "500",
            }}
          >
            <span className="mr-2">Placeholder</span>
            <img src={arrow_icon} className="w-6 h-4" alt="Arrow Icon" />
          </Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center items-center p-0">
        <img
          src={hero_image}
          className={`w-1/2 h-auto max-w-600 ${isAnimated ? "animate__animated animate__zoomIn" : ""}`}
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
