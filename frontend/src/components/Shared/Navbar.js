import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const navigateToCreateProject = () => {
    navigate("/create-project");
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-primary text-white py-4">
      <div className=" flex items-center justify-between container">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={navigateToHome}
        >
          AgileSync
        </h1>
        <button
          className="bg-white text-primary outline-none border-0 py-2 px-6 font-semibold rounded-sm transition-all duration-300 ease-in hover:bg-secondary"
          onClick={navigateToCreateProject}
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default Navbar;
