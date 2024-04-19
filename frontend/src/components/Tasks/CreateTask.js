import React from "react";
import CustomInput from "../Shared/CustomInput";
import CustomTextArea from "../Shared/CustomTextArea";
import PrimaryButton from "../Shared/PrimaryButton";
import toast from "react-hot-toast";
import CustomModal from "../Shared/CustomModal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CreateTask = ({ project, onTaskCreate, isOpen, onClose, editTask }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const validate = (taskName, taskDescription, taskAssignedTo) => {
    if (taskName.trim() === "") {
      toast.error("Task name is required");
      return false;
    }

    if (taskDescription.trim() === "") {
      toast.error("Task description is required");
      return false;
    }

    if (taskAssignedTo.trim() === "") {
      toast.error("Task assignee is required");
      return false;
    }

    return true;
  };

  const createTaskHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const taskName = e.target.taskName.value;
    const taskDescription = e.target.taskDescription.value;
    const taskAssignedTo = e.target.taskAssignedTo.value;
    const taskStatus = e.target.taskStatus.value;

    if (!validate(taskName, taskDescription, taskAssignedTo)) {
      setIsLoading(false);
      return;
    }

    const taskData = {
      name: taskName,
      description: taskDescription,
      assignedTo: taskAssignedTo,
      status: taskStatus,
      projectId: project._id,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/tasks/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while creating the task");
      }

      const data = await response.json();
      toast.success(data?.message || "Task created successfully");
      onTaskCreate();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const editTaskHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const taskName = e.target.taskName.value;
    const taskDescription = e.target.taskDescription.value;
    const taskAssignedTo = e.target.taskAssignedTo.value;
    const taskStatus = e.target.taskStatus.value;

    if (!validate(taskName, taskDescription, taskAssignedTo)) {
      setIsLoading(false);
      return;
    }

    const taskData = {
      name: taskName,
      description: taskDescription,
      assignedTo: taskAssignedTo,
      status: taskStatus,
    };

    try {
      const response = await fetch(`${BACKEND_URL}/tasks/${editTask._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while updating the task");
      }

      const data = await response.json();
      toast.success(data?.message || "Task updated successfully");

      onTaskCreate();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const submitTaskHandler = (e) => {
    if (editTask) {
      editTaskHandler(e);
    } else {
      createTaskHandler(e);
    }
  };

  return (
    <CustomModal onClose={onClose} isOpen={isOpen}>
      <h1 className="text-2xl font-bold text-primary pb-3">Create Task</h1>
      <form
        className="w-[80vw] md:w-[50vw] max-h-[70vh] overflow-y-auto pr-6"
        onSubmit={submitTaskHandler}
      >
        <CustomInput
          value={project.name}
          readOnly={true}
          id="projectName"
          label="Project Name (Read Only)"
          type="text"
          name="projectName"
          placeholder="Enter project name"
        />
        <CustomInput
          id="taskName"
          label="Task Name"
          type="text"
          name="taskName"
          placeholder="Enter task name"
          defaultValue={editTask ? editTask.name : ""}
        />
        <CustomTextArea
          id="taskDescription"
          label="Task Description"
          name="taskDescription"
          placeholder="Enter task description"
          defaultValue={editTask ? editTask.description : ""}
        />
        <CustomInput
          id="taskAssignedTo"
          label="Task Assigned To"
          type="text"
          name="taskAssignedTo"
          placeholder="Enter task assignee"
          defaultValue={editTask ? editTask.assignedTo : ""}
        />
        <div className="my-4">
          <label
            htmlFor="taskStatus"
            className="block text-lg font-medium text-gray-700"
          >
            Task Status
          </label>
          <select
            id="taskStatus"
            name="taskStatus"
            className="mt-1 p-3 block w-full border-2 border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            defaultValue={editTask ? editTask.status : "pending"}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <PrimaryButton disabled={isLoading} className="w-full py-3 mt-6">
          Create Task
        </PrimaryButton>
      </form>
    </CustomModal>
  );
};

export default CreateTask;
