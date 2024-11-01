import React from "react";
import PrimaryButton from "../components/Shared/PrimaryButton";
import CustomInput from "../components/Shared/CustomInput";
import CustomTextArea from "../components/Shared/CustomTextArea";
import toast from "react-hot-toast";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CreateProjectPage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const validate = (projectName, projectDescription, projectCreator) => {
    if (projectName.trim() === "") {
      toast.error("Project name is required");
      return false;
    }

    if (projectDescription.trim() === "") {
      toast.error("Project description is required");
      return false;
    }

    if (projectCreator.trim() === "") {
      toast.error("Project creator is required");
      return false;
    }

    return true;
  };

  const createProjectHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const projectName = event.target.projectName.value;
    const projectDescription = event.target.projectDescription.value;
    const projectCreator = event.target.projectCreator.value;

    if (!validate(projectName, projectDescription, projectCreator)) {
      setIsLoading(false);
      return;
    }

    const projectData = {
      name: projectName,
      description: projectDescription,
      creator: projectCreator,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/projects/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while creating the project");
      }

      const data = await response.json();
      toast.success(data?.message || "Project created successfully");
      // Clear the form
      event.target.reset();
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(
        errorMessage || "Something went wrong while creating the project"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10 max-w-screen-md">
      <h1 className="text-2xl font-bold">Create Project</h1>
      <form className="mt-5" onSubmit={createProjectHandler}>
        <CustomInput
          id="projectName"
          name="projectName"
          type="text"
          label="Project Name"
          placeholder="Enter project name"
        />
        <CustomTextArea
          id="projectDescription"
          name="projectDescription"
          label="Project Description"
          placeholder="Enter project description"
        />
        <CustomInput
          id="projectCreator"
          name="projectCreator"
          type="text"
          label="Project Creator"
          placeholder="Enter the project creator's name"
        />

        <div className="mt-6">
          <PrimaryButton disabled={isLoading} className="w-full py-3">
            Create Project
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectPage;
