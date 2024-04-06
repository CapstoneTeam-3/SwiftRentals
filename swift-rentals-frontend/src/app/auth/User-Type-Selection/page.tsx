"use client";

import { authAPI } from "@/api/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import { toast } from "react-toastify";

export default function Page() {
  const router = useRouter();

  const [role, setRole] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState(false);

  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");
  const confirmPassword = sessionStorage.getItem("confirmPassword");
  const dob = sessionStorage.getItem("dob");

  const handlerRoleClick = (role: string) => {
    setRole(role);
  };

  const submitForm = async () => {
    if (role) {
      const data = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        dob: dob,
        role: role,
      };
      const response = await authAPI.signup(data);
      if (response.status == 200) {
        toast.success("Successfully Registered!");
        setEmailSent(true);
      }
    } else {
      setError(true);
      toast.error("Please select User type");
    }
  };

  return (
    <main className=" w-full">
      <div className="container mx-auto py-5">
        {emailSent ? (
          <div className="flex bg-gray-100 min-h-60 py-10 rounded-lg flex-col gap-4 place-items-center m-20">
            <MdMarkEmailRead color="green" size={44} className="" />
            <div className="text-gray-400 text-center ">
              <span className="text-2xl block">Almost done!</span>a confirmation
              email has been sent, please check your inbox.
            </div>
          </div>
        ) : (
          <div
            className={`bg-gray-100 p-10 rounded-lg shadow-md m-3 ${
              error ? "border border-red-500" : ""
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              SELECT USER TYPE
            </h2>
            <div className="flex flex-col sm:flex-row justify-center contet-center h-72 w-full p-3 m-auto">
              <div
                onClick={() => handlerRoleClick("car owner")}
                className={`bg-white rounded-lg flex justify-center items-center shadow-md m-1 h-full w-full border hover:border-blue-900 ${
                  role === "car owner" ? "border-blue-600" : ""
                } `}
              >
                <h3 className="text-black text-center text-semibold text-xl md:text-2xl">
                  Car-Owner
                  <Image
                    width={100}
                    height={100}
                    src={`/images/car-owner.png`}
                    alt="car-owner-img"
                    style={{ width: "auto", height: "auto" }}
                    priority
                  />
                </h3>
              </div>
              <div
                onClick={() => handlerRoleClick("car rental")}
                className={`bg-white rounded-lg flex flex-col justify-center items-center shadow-md m-1 h-full w-full border hover:border-blue-900 ${
                  role === "car rental" ? "border-blue-600" : ""
                }`}
              >
                <h3 className="text-black text-center text-semibold text-2xl">
                  Car-rental
                </h3>
                <Image
                  src={`/images/car-rental.png`}
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                  alt="car-rental-img"
                  priority
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => router.back()}
                className="bg-blue-200 rounded-xl text-blue-500 font-bold py-3 px-5 m-2 hover:opacity-80 transition-opacity"
              >
                Back
              </button>
              <button
                className="bg-blue-500 rounded-xl text-white py-3 px-5 m-2 font-bold hover:opacity-80 transition-opacity"
                onClick={() => submitForm()}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
