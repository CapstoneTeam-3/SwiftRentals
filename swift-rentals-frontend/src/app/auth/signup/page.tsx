"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEyeSlash, FaUserCircle } from "react-icons/fa";
import {
  MdDateRange,
  MdDriveFileRenameOutline,
  MdMarkEmailRead,
} from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ZodError, z } from "zod";
import CustomFormField from "../../ui/CustomFormField/CustomFormField";

const signupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().refine((password) => password.trim().length > 0, {
      message: "Password cannot be empty",
    }),
    confirmPassword: z
      .string()
      .refine((password) => password.trim().length > 0, {
        message: "Password cannot be empty",
      }),
    name: z
      .string({ required_error: "Name cannot be empty" })
      .min(1, { message: "Name cannot be empty" }),
    dob: z.string({
      required_error: "Please select a date",
      invalid_type_error: "Please select a date",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Page() {
  //state with all required data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    confirmPassword: "",
    role: "",
  });
  //state for all fields errors
  const [errorData, setErrorData] = useState({
    email: "",
    password: "",
    name: "",
    dob: "",
    confirmPassword: "",
    role: "",
  });
  //for any server errors
  const [serverError, setServerError] = useState("");
  //state to switch components based on email sent or not
  const [emailSent, setEmailSent] = useState(false);

  const router = useRouter();

  //updates fields states accordingly
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //reset all errors
    setServerError("");
    setErrorData((prevErrorData) => ({
      ...prevErrorData,
      email: "",
      password: "",
      name: "",
      dob: "",
      confirmPassword: "",
      role: "",
    }));

    try {
      //fire up all validations
      const validatedData = signupSchema.safeParse(formData);
      if (validatedData.success) {

        sessionStorage.setItem('name', formData.name);
        sessionStorage.setItem('email', formData.email);
        sessionStorage.setItem('password', formData.password);
        sessionStorage.setItem('confirmPassword', formData.confirmPassword);
        sessionStorage.setItem('dob', formData.dob);
        router.push("./User-Type-Selection")

      } else {
        for (const error of validatedData.error.errors) {
          //show any field errors
          console.log(error);
          setErrorData((prev) => ({
            ...prev,
            [error.path.toString()]: error.message,
          }));
        }
      }
    } catch (error: any) {
      //show any server errors
      setServerError(error.response.data.error);
      toast.error("Login Failed!");
    }
  };

  return (
    <React.Fragment>
        <div className="w-[75%] min-h-[500px] shadow-2xl rounded-xl m-auto my-14 p-5 flex">
          <div className="w-full md:w-full  p-0 md:p-10 mt-4 flex flex-col place-content-center justify-center">
            <h3 className="font-bold text-3xl ">
              Sign up <span className="text-blue-600">Swift</span>
            </h3>
            <p className="text-gray-400 mb-2 text-sm">
              Enter details to signup for swiftrentals
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="grid grid-cols-1  md:grid-cols-2">
                <CustomFormField
                  errorText={errorData.email}
                  icon={FaUserCircle}
                  placeholder="Enter your email"
                  name="email"
                  type="text"
                  id="userEmail"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <CustomFormField
                  errorText={errorData.name}
                  icon={MdDriveFileRenameOutline}
                  placeholder="Enter full name"
                  name="name"
                  type="text"
                  id="userName"
                  value={formData.name}
                  onChange={handleInputChange}
                />

                <CustomFormField
                  icon={FaEyeSlash}
                  errorText={errorData.password}
                  placeholder="Enter your password"
                  name="password"
                  type="password"
                  id="userPassword"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <CustomFormField
                  icon={FaEyeSlash}
                  errorText={errorData.confirmPassword}
                  placeholder="confirm your password"
                  name="confirmPassword"
                  type="password"
                  id="userConfirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <CustomFormField
                  errorText={errorData.dob}
                  icon={MdDateRange}
                  placeholder="Enter date of birth"
                  name="dob"
                  type="date"
                  id="userDob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
                <input type="hidden" name="role" value={formData.role} />
              </div>
              <div className="w-3/4">
                <p className="text-center text-red-500">{serverError}</p>
              </div>
              <button
                type="submit"
                className="bg-black text-white place-self-center font-semibold p-3 w-full sm:w-3/4 rounded-full mt-4 hover:opacity-80 transition-opacity"
              >
                Sign up
              </button>
            </form>
            <hr className="border-1 m-2" />
            <div className="">
              <p className="text-gray-400 text-center">
                already have an account?
                <span className="text-black font-semibold underline">
                  <Link href="/auth/login">Sign in</Link>
                </span>
              </p>
            </div>
          </div>
          <div className="w-0 lg:w-2/4 relative flex">
            <Image
              src="/images/signup2.jpg"
              alt="small login image"
              className=" w-full rounded-xl shadow-xl hidden lg:block object-cover bottom-8"
              width={400}
              height={100}
            />
          </div>
        </div>
    </React.Fragment>
  );
}
