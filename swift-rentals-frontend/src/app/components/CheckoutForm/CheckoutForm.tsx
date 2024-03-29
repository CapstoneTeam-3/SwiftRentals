"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const submitPayment = async () => {
    if (!stripe || !elements) return;
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/cars/checkout/order-success",
      },
    });
  };
  return (
    <form className="flex justify-center flex-col">
      <PaymentElement />
      <button
        type="button"
        onClick={submitPayment}
        className="bg-black place-self-center m-auto text-white font-semibold p-3 w-64 rounded-full mt-4 hover:opacity-80 transition-opacity"
      >
        Submit
      </button>
    </form>
  );
};
