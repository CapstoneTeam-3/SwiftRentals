"use client";
import { IconContext } from "react-icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" w-full h-52">
      <hr className="mx-10 my-2 border-t-2 rounded-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-full mt-6">
        <div className="text-center">
          <h1 className="font-bold text-2xl p-0 m-4">
            <span>Swift</span>
            <span className="text-blue-600">Rentals</span>
          </h1>
          <div className="flex gap-3 place-content-center">
            <IconContext.Provider
              value={{
                size: "36",
                className: "p-1 rounded-md hover:opacity-50",
              }}
            >
              <FaInstagram className="" />
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
            </IconContext.Provider>
          </div>
        </div>
        <div className="flex justify-evenly flex-wrap col-span-1 md:col-span-2 mx-5 gap-5">
          <div className="flex flex-col mt-4 ">
            <h3 className="font-semibold">Solutions</h3>
            <span className="text-gray-500 hover:underline">Enterprise</span>
            <span className="text-gray-500 hover:underline">Personal Use</span>
            <span className="text-gray-500 hover:underline">remote Work</span>
            <span className="text-gray-500 hover:underline">Enterprise</span>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="font-semibold">Solutions</h3>
            <span className="text-gray-500 hover:underline">Enterprise</span>
            <span className="text-gray-500 hover:underline">Personal Use</span>
            <span className="text-gray-500 hover:underline">remote Work</span>
            <span className="text-gray-500 hover:underline">Enterprise</span>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="font-semibold">Solutions</h3>
            <span className="text-gray-500 hover:underline">Enterprise</span>
            <span className="text-gray-500 hover:underline">Personal Use</span>
            <span className="text-gray-500 hover:underline">remote Work</span>
            <span className="text-gray-500 hover:underline">Enterprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
