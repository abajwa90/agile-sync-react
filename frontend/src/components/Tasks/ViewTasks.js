import React from "react";
import TaskCard from "./TaskCard";

const ViewTasks = ({ tasks, onEdit, onTaskDelete }) => {
  return (
    <div>
      {tasks?.length === 0 && (
        <p className="text-gray-600 mt-8">No tasks found</p>
      )}
      {tasks?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-8">
          {tasks.map((task) => (
            <TaskCard
              id={task._id}
              key={task._id}
              name={task.name}
              description={task.description}
              status={task.status}
              assignedTo={task.assignedTo}
              createdAt={task.createdAt}
              onTaskDelete={onTaskDelete}
              onEdit={() => onEdit(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewTasks;
