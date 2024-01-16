"use client";
import { login } from "@/services/UserService";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import UserContext from "../context/userContext";

const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const loginFormSubmit = async (e) => {
    e.preventDefault();
    if (loginData.email.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data !!", {
        position: "top-center",
      });
      return;
    }

    try {
      const result = await login(loginData);
      toast.success("Login Success");
      context.setUser(result.user)
      router.push("/profile/user");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const handleClear = () => {
    setLoginData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-4 col-start-5">
        <div className="py-5"></div>
        <h1 className=" text-3xl text-center"> Login here</h1>
        <form action="" className="" onSubmit={loginFormSubmit}>
          <div className="mt-3">
            <label
              htmlFor="user_email"
              className="block text-sm font-medium mb-2"
            >
              E-mail
            </label>
            <input
              type="email"
              className="w-full p-3 bg-gray-800 focus:ring-gray-400 rounded-2xl"
              id="user_email"
              placeholder="Type here.."
              name="user_email"
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
              value={loginData.email}
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 focus:ring-gray-400 rounded-2xl"
              id="user_password"
              placeholder="Type here.."
              name="user_password"
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
              value={loginData.password}
            />
          </div>
          <div className="mt-3 space-x-4  text-center">
            <button
              type="submit"
              className="px-3 py-2 rounded-lg bg-green-500 hover:bg-green-800"
            >
              Signup
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-2 rounded-lg bg-red-500 hover:bg-red-800 "
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
