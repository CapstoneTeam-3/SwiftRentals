"use client";

import { driverLicenseAPI } from "@/api/driverLicense";
import { selectToken, selectUser } from "@/redux/features/user/userSlice";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { z, ZodError } from "zod";

const DriverLicenseSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    license_number: z
        .string()
        .min(12, { message: "License number must be valid" })
        .max(12),
    dob: z.string({ required_error: "DOB is required" }),
});

type DriverLicenseSchemaType = z.infer<typeof DriverLicenseSchema>;

export default function CarList() {
    const token = useSelector((state: RootState) => selectToken(state));
    const user = useSelector((state: RootState) => selectUser(state));

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<DriverLicenseSchemaType>({ resolver: zodResolver(DriverLicenseSchema) });


    const router = useRouter();

    const fetchDriverLicense = async () => {     
        try {
            const response = await driverLicenseAPI.getDriverLicense(user._id, token);

            if (response?.data?.license) {
                setValue("name", response.data.license.name);
                setValue("address", response.data.license.address);
                setValue("license_number", response.data.license.license_number);
                setValue("dob", response.data.license.dob);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDriverLicense()
    }, [])

    const onSubmit: SubmitHandler<DriverLicenseSchemaType> = async (data) => {
        try {
            const formData = {
                name: data.name,
                address: data.address,
                license_number: data.license_number,
                dob: data.dob,
                userId: user._id
            }
            
            const response = await driverLicenseAPI.addDriverLicense(formData, token);

            if (response?.data?.message) {
                toast("Driver license added Successfully!");
                router.back();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="min-h-screen w-full">
            <div className="container mx-auto md:max-w-[1050px] py-5">
                <div className="mt-10 mb-4 flex flex-wrap justify-between items-baseline">
                    <h1 className="text-3xl mb-5 font-semibold">Driver License</h1>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <div>
                        <input
                            placeholder="Name"
                            {...register("name")}
                            className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.name && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                        <input
                            placeholder="Address"
                            {...register("address")}
                            className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.address && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.address.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="License number"
                            {...register("license_number")}
                            className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.license_number && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.license_number.message}
                            </p>
                        )}
                        <input
                            placeholder="DOB"
                            type="date"
                            {...register("dob")}
                            className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                        {errors.dob && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {errors.dob.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
