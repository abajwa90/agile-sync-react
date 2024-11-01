import moment from "moment";
import React, { useState } from "react";
import { BsFillPersonFill, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ProjectCard = ({ id, name, description, creator, tasks, createdAt, onDelete }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Handler to delete a project
  const deleteProjectHandler = async (e) => {
    e.stopPropagation(); // Prevent card click action when deleting
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Something went wrong while deleting the project");
      }
      toast.success("Project deleted successfully");
      if (onDelete) onDelete(id); // Remove project from list after successful deletion
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
          Created On: {moment(createdAt).format("MMM Do YYYY")}
        </p>
      </div>
      <div className="border-t border-gray-400 mt-2">
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <BsFillPersonFill className="text-primary" />
            <p className="text-sm ml-2">{creator}</p>
          </div>
          <p className="text-sm">{tasks.length} tasks</p>
          {/* Delete button */}
          <button
            className="text-red-500 hover:text-red-700 transition-all"
            onClick={deleteProjectHandler}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : <BsTrash />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
