"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from 'next-auth/react';
import axios from "axios";
import { MdMarkEmailRead } from "react-icons/md";

export default function Page() {

  const [role, setRole] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState(false);

  const name = sessionStorage.getItem('name');
  const email = sessionStorage.getItem('email');
  const password = sessionStorage.getItem('password');
  const confirmPassword = sessionStorage.getItem('confirmPassword');
  const dob = sessionStorage.getItem('dob');

  const handlerRoleClick = (role: string) => {
    setRole(role)
  }
  
  const submitForm = async () => {
    if(role){
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          dob: dob,
          role: role,
        }
      );
      if (response.status == 200) {
        sessionStorage.clear();
        toast.success("Successfully Registered!");
        setEmailSent(true);
      }
      toast.success("done")
    } else {
      setError(true)
      toast.error("Please select User type")
    }
  }
  

  return (
    <main className="min-h-screen w-full bg-[#f1f1fc]">
      <div className="container mx-auto md:max-w-[1050px] py-5">
      {emailSent ? (
        <div className="flex flex-col place-items-center m-20">
          <MdMarkEmailRead color="green" size={44} className="" />
          <div className="text-gray-400 text-center ">
            <span className="text-2xl block">Almost done!</span>a confirmation
            email has been sent, please check your inbox.
          </div>
        </div>
      ) : (
        <div className={`bg-gray-100 p-10 rounded-lg shadow-md m-3 ${error ? "border border-red-500" : ""}`}>
          <h2 className="text-2xl font-semibold mb-4 text-center">SELECT USER TYPE</h2>
          <div className="flex flex-col sm:flex-row justify-center contet-center h-72 w-full p-3 m-auto">
            <div onClick={() => handlerRoleClick("car owner")} className={`bg-white rounded-lg flex justify-center items-center shadow-md m-1 h-full w-full border hover:border-blue-900 ${role === "car owner" ? "border-blue-600" : ""} `}>
              <h3 className="text-black text-center text-semibold text-xl md:text-2xl">Car-Owner
                <Image 
                width={100}
                height={100}
                src={`/images/car-owner.png`} alt="car-owner-img" 
                style={{ width: "auto", height: "auto" }}
                priority
                />
              </h3>
            </div>
            <div onClick={() => handlerRoleClick("car rental")} className={`bg-white rounded-lg flex flex-col justify-center items-center shadow-md m-1 h-full w-full border hover:border-blue-900 ${role === "car rental" ? "border-blue-600" : ""}`}>
              <h3 className="text-black text-center text-semibold text-2xl">Car-rental</h3>
              <Image 
              src={`/images/car-rental.png`} 
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              alt="car-rental-img" 
              priority/>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100">Back</button>
            <button className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => submitForm()}>Next</button>
          </div>
        </div>
      )}
      </div>
    </main>
  )
}
