"use client";
import { DeleteTask, getTaskOfUser } from "@/services/taskService";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/userContext";
import Task from "./Task";
import { toast } from "react-toastify";
import Image from "next/image";
import cleanup from '../../assets/cleanup.svg'

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const context = useContext(UserContext);
  async function loadTasks(userId) {
    try {
      const tasks = await getTaskOfUser(userId);
      setTasks([...tasks].reverse());
      console.log(tasks);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (context.user) {
      loadTasks(context.user._id);
    }
  }, [context.user]);

  async function deleteTaskParent(taskId) {
    try {
      const result = await DeleteTask(taskId);
      const newTasks = tasks.filter((item) => item._id != taskId);

      setTasks(newTasks);
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4">
        {tasks.length > 0 ? (
          <>
            <h1 className="text-3xl text-center">
              Your Tasks ( {tasks.length} )
            </h1>
            {tasks.map((task) => {
              return (
                <Task
                  task={task}
                  key={task._id}
                  deleteTaskParent={deleteTaskParent}
                />
              );
            })}
          </>
        ) : (
          <>
          {/* <div className="h-150 w-150 flex justify-center items-center m-5">
            <Image src={cleanup}/>
          </div>
            <h1 className="text-2xl text-center">Nothing to show here...</h1> */}
            </>
        )}
      </div>
    </div>
  );
};

export default ShowTasks;
