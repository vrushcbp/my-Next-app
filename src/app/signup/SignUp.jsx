"use client";
import React, { useState } from "react";
import signupBanner from "../../assets/signup.svg";
import Image from "next/image";
import { addUser } from "@/services/UserService";
import { toast } from "react-toastify";
const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL:
      "https://imgs.search.brave.com/xRLAOStYtw4m5_8Pov_PBYMh7lmcrkLzavkwcT3lVHU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzUy/LzM2MF9GXzY0Njc1/MjA5Xzd2ZTJYUUFO/dXp1SGpNWlhQM2FJ/WUlwc0RLRWJGNWRE/LmpwZw",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      if (
        user.name !== "" &&
        user.email !== "" &&
        user.password !== "" &&
        user.about !== ""
      ) {
        const result = await addUser(user);
        setUser({
          name: "",
          email: "",
          password: "",
          about: "",
        });
        toast.success("Signed up successfully!");
      } else {
        toast.error("Please fill all data");
      }
    } catch (error) {
      toast.warning(error);
    }
  };

  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-4 col-start-5">
        <div className="py-5">
          <div className="m-5 flex justify-center">
            <Image
              src={signupBanner}
              alt="signup banner"
              style={{ width: "50%" }}
            />
          </div>
          <h1 className=" text-3xl text-center"> Signup here</h1>
          <form action="#!" className="mt-5" onSubmit={handleSignup}>
            <div className="mt-3">
              <label
                htmlFor="user_name"
                className="block text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 focus:ring-gray-400 rounded-2xl"
                id="user_name"
                placeholder="Type here.."
                name="user_name"
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
                value={user.name}
              />
            </div>
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
                  setUser({ ...user, email: e.target.value });
                }}
                value={user.email}
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
                  setUser({ ...user, password: e.target.value });
                }}
                value={user.password}
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="user_about"
                className="block text-sm font-medium mb-2"
              >
                About
              </label>
              <textarea
                type="text"
                className="w-full p-3 bg-gray-800 focus:ring-gray-400 rounded-2xl"
                id="user_about"
                placeholder="Type here.."
                rows={5}
                name="user_about"
                onChange={(e) => {
                  setUser({ ...user, about: e.target.value });
                }}
                value={user.about}
              ></textarea>
            </div>
            <div className="mt-3 space-x-4  text-center">
              <button
                type="submit"
                className="px-2 py-3 rounded-lg bg-green-500 hover:bg-green-800"
              >
                Signup
              </button>
              <button className="px-2 py-3 rounded-lg bg-red-500 hover:bg-red-800 ">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
