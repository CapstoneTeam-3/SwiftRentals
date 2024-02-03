"use client";

import Image from "next/image";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEyeSlash, FaUserCircle } from "react-icons/fa";
import CustomFormField from "../ui/CustomFormField/CustomFormField";

export default function page() {
 
  return (
    <div>
      <div className="w-[75%] min-h-[500px] shadow-2xl rounded-xl m-auto my-14 p-5 flex">
        <div className="w-full md:w-1/2 p-10 mt-4 flex flex-col place-content-center justify-center">
          <h3 className="font-bold text-3xl ">
            Log in <span className="text-blue-600">Swift</span>
          </h3>
          <p className="text-gray-400 mb-2 text-sm">
            Enter details to log into swiftrentals
          </p>
          <form action="POST">
            <CustomFormField
              icon={FaUserCircle}
              placeholder="Enter your email"
              name="user_email"
              type="text"
              id="userEmail"
            />
            <CustomFormField
              icon={FaEyeSlash}
              placeholder="Enter your password"
              name="user_password"
              type="password"
              id="userPassword"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold p-3 w-full sm:w-3/4 rounded-full mt-4 hover:opacity-80 transition-opacity"
            >
              Log in
            </button>
          </form>
          <ToastContainer />
          <div className="w-3/4 p-1">
            <p className="font-semibold sm:text-md text-center">
              forgot your password?
            </p>
          </div>
          <hr className="w-3/4 border-1 m-2" />
          <div className="w-3/4">
            <p className="text-gray-400 text-center">
              Don&apos;t have an account?
              <span className="text-black font-semibold underline">
                <a href="/">Sign up</a>
              </span>
            </p>
          </div>
        </div>
        <div className="w-0 md:w-1/2 relative">
          <Image
            src="/images/login1.jpg"
            alt="small login image"
            className="w-full rounded-xl absolute right-20 shadow-xl hidden lg:block  bottom-8"
            width={400}
            height={100}
          />
          <Image
            src="/images/login2.jpg"
            alt="small login image"
            className="hidden md:block h-full lg:w-52 lg:h-auto rounded-xl  absolute right-4 top-0 shadow-2xl"
            width={400}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
