"use client";
import React, { useContext } from "react";
import UserContext from "../context/userContext";
import { DeleteTask } from "@/services/taskService";
import { RxCross2 } from "react-icons/rx";

const Task = ({ task, deleteTaskParent }) => {
  const { user } = useContext(UserContext);

    const handleDelete=(taskId)=>{
        deleteTaskParent(taskId)
    }
  return (
    <div
      className={`shadow-lg mt-2 rounded-md ${
        task.status == "completed" ? "bg-green-800" : "bg-gray-800"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">{task.title}</h1>
          <span className="bg-gray-900 rounded-full h-7 w-7 flex justify-center items-center hover:bg-gray-500 cursor-pointer" onClick={()=>handleDelete(task._id)}>
            <RxCross2 />
          </span>
        </div>
        <p className="font-normal">{task.content}</p>
        <div className="flex justify-between mt-3">
          <p className="text-left">
            {" "}
            Status:{" "}
            <span className="font-bold">{task.status.toUpperCase()}</span>
          </p>
          <p className="text-right">
            {" "}
            Author: <span className="font-bold">{user.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
