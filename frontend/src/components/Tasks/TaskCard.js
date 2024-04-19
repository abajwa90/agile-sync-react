import React from "react";
import moment from "moment";
import { BsPencil, BsFillPersonFill, BsTrash } from "react-icons/bs";
import toast from "react-hot-toast";
import CustomModal from "../Shared/CustomModal";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const TaskCard = ({
  name,
  description,
  status,
  assignedTo,
  createdAt,
  onEdit,
  id,
  onTaskDelete,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const deleteTaskHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Something went wrong while deleting the task");
      }
      toast.success("Task deleted successfully");
      setIsOpen(false);
      onTaskDelete();
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error.message;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100 border border-primary rounded-sm p-4 h-48 flex flex-col justify-between">
        <div className="flex flex-col flex-1">
          <h1 className="text-xl font-semibold text-gray-800">
            Task Name: {name}
          </h1>
          <p className="text-gray-600 text-sm flex-1">{description}</p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{status}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-semibold">Created At:</span>{" "}
            {moment(createdAt).format("MMM Do YYYY")}
          </p>
        </div>
        <div className="border-t border-gray-400 mt-2 pt-2 flex items-center justify-between">
          <div className="flex items-center">
            <BsFillPersonFill className="text-primary" />
            <p className="text-sm ml-2">{assignedTo}</p>
          </div>
          <div className="flex gap-2">
            <button className="text-primary" onClick={onEdit}>
              <BsPencil />
            </button>
            <button className="text-red-500" onClick={() => setIsOpen(true)}>
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <CustomModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h1 className="text-2xl font-bold text-primary pb-3">Delete Task</h1>
          <p className="text-gray-600">
            Are you sure you want to delete this task?
          </p>
          <div className="flex gap-4 mt-6 justify-end sm:min-w-[500px]">
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-sm"
              onClick={deleteTaskHandler}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
            <button
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-sm"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default TaskCard;
