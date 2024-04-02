"use client";
import { selectToken } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AdminHome() {
  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto md:max-w-[1050px] py-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            {TableHeader()}
            <tbody>
                {TableRow()}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );

  function TableHeader() {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            Sr.
          </th><th scope="col" className="px-6 py-3">
            Sr.
          </th><th scope="col" className="px-6 py-3">
            Sr.
          </th><th scope="col" className="px-6 py-3">
            Sr.
          </th><th scope="col" className="px-6 py-3">
            Sr.
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
    );
  }

  function TableRow() {
    return (
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="px-6 py-4">test</td>
        <td className="px-6 py-4">test</td>
        <td className="px-6 py-4">test</td>
        <td className="px-6 py-4">test</td>
        <td className="px-6 py-4">test</td>
        <td className="px-6 py-4">test</td>
        <td className="px-6 py-4 flex items-center gap-4">
          <button
            className="p-2 rounded-md bg-white shadow-md border-1"
          > extra button
          </button>
        </td>
      </tr>
    );
  }
}
