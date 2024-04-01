"use client";

import { CheckoutForm } from "@/app/components/CheckoutForm/CheckoutForm";
import { selectToken } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdShoppingCartCheckout as CheckoutIcon } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51OmOBbBCdwIluutviPAN8CbA7gW3jxo5GBZyJOFALxakpG0rsRgkc0QwKvLpaqvBLJ8qSVCS4elmpeyjabO96gUA00HfmF8oqp"
);

export default function Page(props: any) {

  const token = useSelector((state: RootState) => selectToken(state));
  const router = useRouter();

  const [secret, setSecret] = React.useState(null);
  console.log("router : ", props.router);
  const searchParam = useSearchParams();
  const amount = searchParam.get("amount");
  console.log("amount:", amount);

  React.useEffect(() => {
    const fetchSecret = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/payment/intent?amount=${amount}`
        );
        setSecret(data.client_secret);
      } catch (error) {
        console.error("Error fetching secret:", error);
      }
    };
    fetchSecret();
  }, [amount]);

  if (!secret) {
    return <div>loading</div>;
  }

  const options = {
    clientSecret: secret,
    appearance: {
      theme: "flat",
      variables: {
        fontFamily: ' "Gill Sans", sans-serif',
        fontLineHeight: "1.5",
        borderRadius: "10px",
        colorBackground: "#F6F8FA",
        accessibleColorOnColorPrimary: "#262626",
      },
      rules: {
        ".Block": {
          backgroundColor: "var(--colorBackground)",
          boxShadow: "none",
          padding: "12px",
        },
        ".Input": {
          padding: "12px",
        },
        ".Input:disabled, .Input--invalid:disabled": {
          color: "lightgray",
        },
        ".Tab": {
          padding: "10px 12px 8px 12px",
          border: "none",
        },
        ".Tab:hover": {
          border: "none",
          boxShadow:
            "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
        },
        ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
          border: "none",
          backgroundColor: "#fff",
          boxShadow:
            "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
        },
        ".Label": {
          fontWeight: "500",
        },
      },
    },
  };

  return (
    <div className="flex justify-center rounded-xl flex-col items-center p-10  w-[80%] mx-auto my-10 bg-gray-100">
      <CheckoutIcon className="inline-block m-2 " size={40} />
      <h2 className="text-3xl font-bold text-center mb-4">
        Complete the Booking!
      </h2>
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
