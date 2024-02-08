"use client";

import axios from "axios";
import { log } from "console";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEyeSlash, FaUserCircle } from "react-icons/fa";
import { MdOutlineLockReset as Lock } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ZodError, z } from "zod";
import CustomFormField from "../../../ui/CustomFormField/CustomFormField";

const forgetSchema = z
  .object({
    password: z.string().refine((password) => password.trim().length > 0, {
      message: "Password cannot be empty",
    }),
    confirmPassword: z
      .string()
      .refine((password) => password.trim().length > 0, {
        message: "Confirm Password cannot be empty",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function Page(props: any) {
  const searchParams = props.searchParams;
  const page = searchParams.page;

  const router = useRouter();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorData, setErrorData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const passwordChangeHandler = async () => {
    setErrorData({ password: "", confirmPassword: "" });
    const validate = forgetSchema.safeParse(formData);
    console.log(validate);
    if (!validate.success) {
      for (const error of validate.error.errors) {
        console.log(error);
        setErrorData((prev) => ({
          ...prev,
          [error.path.toString()]: error.message,
        }));
      }
    } else {
      const response = await axios(
        `http://localhost:3001/api/auth/reset-password?token=${searchParams.token}`,
        {
          method: "post",
          data: {
            newPassword: formData.password,
            confirmPassword: formData.confirmPassword,
          },
        }
      );
      if (response.status == 200) {
        toast.success("Password changed successfully!");
        router.push("/auth/login");
      } else toast.error("Something went Wrong. Please try again!");
    }
  };
  return (
    <div className="flex bg-gray-100 py-10 rounded-lg flex-col gap-4 place-items-center m-20">
      <Lock size={60} color="green" className="" />
      <div className="text-gray-400 text-center m-2">
        <span className="text-2xl block">Reset Password</span>
        Please enter your new password to reset.
      </div>
      <div className="w-full md:w-1/3">
        <CustomFormField
          errorText={errorData.password}
          icon={FaUserCircle}
          placeholder="Enter your password"
          name="password"
          type="password"
          id="userPassword"
          onChange={handleInputChange}
          value={formData.password}
        />
        <CustomFormField
          errorText={errorData.confirmPassword}
          icon={FaUserCircle}
          placeholder="Confirm your password"
          name="confirmPassword"
          type="password"
          id="userConfirmPassword"
          onChange={handleInputChange}
          value={formData.confirmPassword}
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
