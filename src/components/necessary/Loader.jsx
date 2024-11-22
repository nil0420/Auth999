import React from "react";

const Loader = () => {
  const loaderContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#000", // Netflix black background
  };

  const dotStyle = {
    width: "10px",
    height: "10px",
    margin: "0 5px",
    backgroundColor: "#e50914", // Netflix red
    borderRadius: "50%",
    animation: "pulse 1.5s infinite ease-in-out",
  };

  const keyframesStyle = `
    @keyframes pulse {
      0%, 80%, 100% {
        opacity: 0;
        transform: scale(0.8);
      }
      40% {
        opacity: 1;
        transform: scale(1.2);
      }
    }
  `;

  return (
    <div style={loaderContainerStyle}>
      <style>{keyframesStyle}</style> {/* Adding keyframes inline */}
      <div style={{ ...dotStyle, animationDelay: "0s" }}></div>
      <div style={{ ...dotStyle, animationDelay: "0.2s" }}></div>
      <div style={{ ...dotStyle, animationDelay: "0.4s" }}></div>
    </div>
  );
};

export default Loader;
