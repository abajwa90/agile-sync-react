import React from "react";
import { SyncLoader } from "react-spinners";
import ProjectCard from "../components/Project/ProjectCard";
import toast from "react-hot-toast";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
  const [projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/projects`,{
      });
      if (!response.ok) {
        throw new Error("Something went wrong while fetching the projects");
      }

      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold">Projects</h1>
      {isLoading && (
        <div className="flex items-center justify-center h-[70vh]">
          <SyncLoader color="#003C43" />
        </div>
      )}
      {!isLoading && projects.length === 0 && (
        <p className="text-gray-600 mt-8">No projects found</p>
      )}
      {!isLoading && projects.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-8">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              id={project._id}
              name={project.name}
              description={project.description}
              creator={project.creator}
              tasks={project.tasks}
              createdAt={new Date(project.createdAt).toDateString()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
