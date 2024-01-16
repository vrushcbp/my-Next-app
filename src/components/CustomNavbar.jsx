"use client";
import UserContext from "@/app/context/userContext";
import { logout } from "@/services/UserService";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CustomNavbar = () => {
  const router = useRouter();
  const context = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const result = await logout();
      router.push("/login");
      context.setUser('');
    } catch (error) {
      console.log(error);
      context.setUser(undefined)
      toast.error("Logout Failed");
    }
  };
  return (
    <nav className="bg-blue-600 h-12 py-3 px-2 flex justify-between items-center">
      <div className="brand">
        <h1 className="text-2xl font-semibold">
          <a href="#">Work Manager</a>
        </h1>
      </div>
      <div>
        <ul className="flex space-x-6">
          {context.user && (
            <>
              <li>
                <Link href={"/"} className="hover:text-blue-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/add-task"} className="hover:text-blue-200">
                  Add Task
                </Link>
              </li>
              <li>
                <Link href={"/show-task"} className="hover:text-blue-200">
                  Show Task
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-6">
          {context.user && (
            <>
              <li>
                <Link href={"#!"}>{context.user.name}</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}

          {!context.user && (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
