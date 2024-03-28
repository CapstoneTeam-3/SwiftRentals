"use client";

import { carAPI } from "@/api/cars";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { PiShieldCheckFill as SuccessIcon } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    toast.success("Car Booking requested Successfully!");
    toast.success("You can now chat with car owner!");
  }, []);

  return (
    <div className="flex bg-gray-100 py-10 rounded-lg flex-col gap-4 place-items-center m-20">
      <SuccessIcon size={80} className="" color="green" />
      <div className="text-gray-400 text-center m-2">
        <span className="text-2xl block">Booking Complete!</span>
        Your booking was completed successfully! Chat is now enabled with the
        owner.
      </div>
      <button
        type="button"
        onClick={() => {}}
        className="bg-black place-self-center text-white font-semibold p-3 w-64 rounded-full mt-4 hover:opacity-80 transition-opacity"
      >
        Continue
      </button>
    </div>
  );
}
