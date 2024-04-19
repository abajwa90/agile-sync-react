import moment from "moment";
import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ id, name, description, creator, tasks, createdAt }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white border border-primary rounded-sm p-4 h-44 flex flex-col justify-between cursor-pointer hover:shadow-md hover:bg-gray-100 transition-all duration-200 ease-in"
      onClick={() => navigate(`/project/${id}`)}
    >
      <div className="flex flex-col flex-1">
        <h1 className="text-xl font-semibold text-gray-800">
          Project Name: {name}
        </h1>
        <p className="text-gray-600 text-sm flex-1">{description}</p>
        <p className="text-sm text-gray-600 mt-2">
          Created At: {moment(createdAt).format("MMM Do YYYY")}
        </p>
      </div>
      <div className="border-t border-gray-400 mt-2">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <BsFillPersonFill className="text-primary" />
            <p className="text-sm ml-2">{creator}</p>
          </div>
          <p className="text-sm">{tasks.length} tasks</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
