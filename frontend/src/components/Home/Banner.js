import React from "react";
import logo from "../../imgs/logo.png";

const logoStyle = {
    width: '100%',
};

const Banner = () => {
  return (
    <div className="banner text-white">
      <div className="container p-4 text-center">
        <img src={logo} alt="banner" style={logoStyle} />
        <h2>A place to get the cool stuff.</h2>
      </div>
    </div>
  );
};

export default Banner;
