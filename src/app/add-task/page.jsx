"use client";
import React, { useContext, useState } from "react";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
import { addTask } from "@/services/taskService";
import {toast} from 'react-toastify'
import UserContext from "../context/userContext";
const metadata = {
  title: "Add-Task: Work Manager",
};
const AddTask = () => {
  const context= useContext(UserContext)
  const uid=context.user._id
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userId:``
  });
  const handleAddTask = async (e) => {
    e.preventDefault();
    console.log(task);

    try {
      const result = await addTask(task);
      toast.success('Your task was added successfully!')
      setTask({
        title:'',
        content:'',
        status:'none'
      })
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid grid-cols-12 justify-center">
      <div className="col-span-6 col-start-4">
        <div className="my-8 flex justify-center">
          <Image src={loginSvg} style={{ width: "50%" }} />
        </div>

        <h1 className="text-3xl">Add your tasks here..</h1>
        <form action="" onSubmit={handleAddTask}>
          <div className="mt-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="task_title"
            >
              Title
            </label>
            <input
              type="text"
              className="w-full p-3 bg-slate-500 focus:ring-gray-400 rounded"
              id="task_title"
              name="task_title"
              onChange={(e) => {
                setTask({
                  ...task,
                  title: e.target.value,
                });
              }}
              value={task.title}
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="task_content"
            >
              Content
            </label>
            <textarea
              className="w-full p-3 bg-slate-500 focus:ring-gray-400 rounded"
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(e) => {
                setTask({
                  ...task,
                  content: e.target.value,
                });
              }}
              value={task.content}
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="task_status"
            >
              Status
            </label>
            <select
              className="w-full p-3 bg-slate-500 focus:ring-gray-400 rounded"
              id="task_status"
              name="task_status"
              onChange={(e) => {
                setTask({
                  ...task,
                  status: e.target.value,
                });
              }}
              value={task.status}
            >
              <option value="none" disabled selected>
                Select Status
              </option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800">
              Add Task
            </button>
            <button className="bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3">
              clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
