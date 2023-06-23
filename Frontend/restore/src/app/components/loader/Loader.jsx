import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loading-position">
      <div className="container-Loading">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="ring"></div>
        <p className="p-loading">Cargando...</p>
      </div>
    </div>
  );
};

export default Loader;