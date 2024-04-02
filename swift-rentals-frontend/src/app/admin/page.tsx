"use client"
import { selectToken } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaUsers, FaCarSide } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";

export default function AdminHome() {

  const cards = [
    { value: "cars", label: "Cars", icon: <FaCarSide/> },
    { value: "users", label: "Users", icon: <FaUsers/> },
    { value: "payments", label: "Payment", icon: <MdOutlinePayments/> },
  ];
  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto md:max-w-[1050px] py-5">
        <h1 className="text-3xl mb-5">Welcome to Admin Page</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {cards.map((item) => (
            <Link key={item.value} href={`/admin/${item.value}`}>
              <div className="bg-white shadow-md p-5 rounded-lg">
              <span className="text-xl">{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
