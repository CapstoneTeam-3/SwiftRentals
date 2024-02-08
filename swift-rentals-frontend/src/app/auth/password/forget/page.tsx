"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEyeSlash, FaUserCircle, FaLock as Lock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ZodError, z } from "zod";
import CustomFormField from "../../../ui/CustomFormField/CustomFormField";

const forgetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [errorData, setErrorData] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const passwordChangeHandler = () => {
    setErrorData("");
    const validate = forgetSchema.safeParse({ email });
    console.log(validate);
    if (!validate.success) {
      for (const error of validate.error.errors) {
        console.log(error);
        setErrorData(error.message);
      }
    } else {
      toast.success("Email sent! Please check your inbox.");
      axios.post("http://localhost:3001/api/auth/forgot-password", {
        email,
      });
    }
  };
  return (
    <div className="flex bg-gray-100 py-10 rounded-lg flex-col gap-4 place-items-center m-20">
      <Lock size={44} className="" />
      <div className="text-gray-400 text-center m-2">
        <span className="text-2xl block">Forgot Password?</span>
        Please enter the registered email address and we will send a reset link.
      </div>
      <div className="w-full md:w-1/3">
        <CustomFormField
          errorText={errorData}
          icon={FaUserCircle}
          placeholder="Enter your email"
          name="email"
          type="text"
          id="userEmail"
          onChange={handleInputChange}
          value={email}
        />
      </div>
      <button
        type="button"
        onClick={passwordChangeHandler}
        className="bg-black place-self-center text-white font-semibold p-3 w-64 rounded-full mt-4 hover:opacity-80 transition-opacity"
      >
        Continue
      </button>
    </div>
  );
}
