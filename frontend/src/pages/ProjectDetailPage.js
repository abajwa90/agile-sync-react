import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import ProjectCard from "../components/Project/ProjectCard";
import ViewTasks from "../components/Tasks/ViewTasks";
import CreateTask from "../components/Tasks/CreateTask";
import PrimaryButton from "../components/Shared/PrimaryButton";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
  const [editTask, setEditTask] = React.useState(null);

  const fetchProject = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/projects/${id}`);
      if (!response.ok) {
        throw new Error("Something went wrong while fetching the project");
      }

      const data = await response.json();
      setProject(data.project);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      fetchProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container py-10">
      {isLoading && (
        <div className="flex items-center justify-center h-[70vh]">
          <SyncLoader color="#003C43" />
        </div>
      )}
      {!isLoading && !project && (
        <p className="text-gray-600 mt-8">No project found</p>
      )}
      {!isLoading && project && (
        <div>
          <ProjectCard
            key={project._id}
            id={project._id}
            name={project.name}
            description={project.description}
            creator={project.creator}
            tasks={project.tasks}
          />
          <div className="my-8 flex items-center gap-6 justify-between border-b border-gray-400 pb-6">
            <h1 className="text-2xl font-bold text-primary">Tasks</h1>
            <PrimaryButton
              onClick={() => {
                setEditTask(null);
                setIsTaskModalOpen(true);
              }}
            >
              Create Task
            </PrimaryButton>
          </div>
          <div>
            <ViewTasks
              tasks={project.tasks}
              onEdit={(task) => {
                setEditTask(task);
                setIsTaskModalOpen(true);
              }}
              onTaskDelete={fetchProject}
            />
            {isTaskModalOpen && (
              <CreateTask
                editTask={editTask}
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                project={project}
                onTaskCreate={() => {
                  setEditTask(null);
                  setIsTaskModalOpen(false);
                  fetchProject();
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;
