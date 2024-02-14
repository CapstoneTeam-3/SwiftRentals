"use client";
import { z, ZodError } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegSnowflake } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { carAPI } from "@/api/cars";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchFeatures } from "@/redux/features/features/featureSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CarSchema = z.object({
    make: z.string().min(1, { message: "Make is required" }),
    model: z.string().min(1, { message: "Model is required" }),
    manufacturing_year: z.string().min(4, { message: "manufacturing_year must be valid" }).max(4),
    is_available: z.boolean({ required_error: "is_available is required" }),
    price: z.string().min(1, { message: "Price is required" }).max(3, { message: 'Price cannot be more than $999' }),
    description: z.string().min(1, { message: "description is required" }),
    location: z.string().min(1, { message: "location is required" }),
    images: z.any()
    // features: z.string().min(1, { message: "Model is required" }),
});

type CarSchemaType = z.infer<typeof CarSchema>;

export default function AddCar() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const feature = useAppSelector(state => state.feature)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CarSchemaType>({ resolver: zodResolver(CarSchema) });


    useEffect(() => {
        dispatch(fetchFeatures());
    }, [])

    const onSubmit: SubmitHandler<CarSchemaType> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("images", data.images[0]);
            formData.append("make", data.make);
            formData.append("model", data.model);
            formData.append("manufacturing_year", data.manufacturing_year);
            formData.append("is_available", String(data.is_available));
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("location", data.location);
            formData.append("Features", JSON.stringify(featuresIncluded));

            const response = await carAPI.addCar(formData);

            if (response?.data?.message) {
                alert("Car added Successfully!");
                router.back();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const [featuresIncluded, setFeaturesIncluded] = useState<string[]>([]);

    const handleFeatureIncluded = (value: string) => {
        const isFeatureIncluded = featuresIncluded.includes(value);

        console.log('isFeatureIncluded ', isFeatureIncluded);

        if (isFeatureIncluded) {
            setFeaturesIncluded(featuresIncluded.filter((feature) => feature !== value));
        } else {
            setFeaturesIncluded([...featuresIncluded, value]);
        }
    }

    return (
        <main className="min-min-h-screen w-full bg-[#f1f1fc]">
            <div className="container mx-auto md:max-w-[1050px] py-5">
                <h1 className="text-3xl mb-5">Add Car</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <input type="file" multiple {...register("images")} className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />

                    <input placeholder="model" {...register("model")} className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.model && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.model.message}</p>}

                    <input placeholder="make" {...register("make")} className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.make && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.make.message}</p>}

                    <input type="number" placeholder="manufacturing_year" {...register("manufacturing_year")} className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.manufacturing_year && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.manufacturing_year.message}</p>}

                    <label className="mt-3 relative inline-flex items-center mb-5 cursor-pointer">
                        <input type="checkbox" {...register("is_available")} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 ">Is Available</span>
                    </label>

                    <input type="number" placeholder="price" {...register("price")} className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.price && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.price.message}</p>}

                    <input placeholder="description" {...register("description")} className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.description && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.description.message}</p>}

                    <input placeholder="location" {...register("location")} className="bg-gray-50 border mt-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    {errors.location && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.location.message}</p>}

                    <div className="flex flex-wrap gap-3 my-3">
                        {feature?.featureList?.map((feature, index) =>
                            <div
                                key={index}
                                onClick={() => handleFeatureIncluded(feature._id)}
                                className={`${featuresIncluded.includes(feature._id) ? 'bg-blue-100' : 'bg-white'} py-3 px-4 rounded-md shadow-sm`}>
                                {/* {feature.icon} */}
                                <FaRegSnowflake size={25} />
                                <p>{feature.name}</p>
                            </div>
                        )}
                    </div>

                    <button type="submit" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                        submit
                    </button>
                </form>
            </div>

        </main>
    )
}