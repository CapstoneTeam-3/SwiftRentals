"use client"
import { IoIosStar } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { SlHeart } from "react-icons/sl";
import Dropdown from "../components/Dropdown";
import { IoFilterSharp } from "react-icons/io5";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchCars, setSelectedCar } from "@/redux/features/cars/carSlice";
import { Car } from "@/types";
import { useRouter } from "next/navigation";

export default function CarList() {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const car = useAppSelector(state => state.car);
    console.log('car ', car);

    useEffect(() => {
        dispatch(fetchCars(1));
    }, [])

    const handleCarClick = (car: Car) => {
        dispatch(setSelectedCar({ car }));
        route.push('/cars/detail');
    }

    return (
        <main className="min-h-screen w-full bg-[#f1f1fc]">
            <div className="container mx-auto md:max-w-[1050px] py-5">
                {Filter()}
                <div className="mt-10 mb-8 flex flex-wrap justify-between items-baseline">
                    <h1 className="text-3xl mb-5 font-semibold">Choose your vehicle</h1>
                    <h2 className="text-xl font-light">{`${car?.totalCars ?? 0}`} car{car?.totalCars>1 && 's'} available</h2>
                </div>
                <div className="grid grid-cols-1 gap-5">
                    {car.carList?.map((item: Car, index) =>
                        <div onClick={() => handleCarClick(item)} key={index} className="flex flex-col flex-wrap border bg-white rounded-2xl overflow-hidden md:flex-row">
                            <div className="w-full md:w-[300px]">
                                <img
                                    src={`data:image/png;base64, ${item?.images[0]}`}
                                    className="h-[180px] w-full object-cover bg-[#f7f4f4]"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/car-placeholder.png' }}
                                    alt="Car"
                                />
                            </div>
                            <div className="flex flex-col flex-1 py-2 px-3">
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between">
                                        <h2 className="text-xl font-bold">{item?.model}</h2>
                                        <div className="bg-white rounded-md p-2 shadow-sm">
                                            <SlHeart />
                                        </div>
                                    </div>
                                    <span className="flex items-center mt-2 mb-1 text-lg">4.87 <IoIosStar className="mx-1" />(103 trips)</span>
                                    <span className="flex items-center"><FaMapLocationDot className="me-2" /> {item?.location}</span>
                                </div>
                                <span className="text-lg font-bold mb-1 text-right me-2">CAD ${`${item?.price ?? 0}`} total</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )

    function Filter() {
        const sortByOptions = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ];

        const handleDropdownChange = (selectedOption: any) => {
            console.log('Selected option:', selectedOption);
        };

        return (
            <div className="flex items-center mt-2">
                <div className="flex flex-wrap gap-5">
                    <Dropdown label="Sort by" options={sortByOptions} onChange={handleDropdownChange} />
                    <Dropdown label="Make" options={sortByOptions} onChange={handleDropdownChange} />
                    <Dropdown label="Transmission" options={sortByOptions} onChange={handleDropdownChange} />
                    <button
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
                    >
                        <IoFilterSharp className="me-3" />
                        Filters
                    </button>

                </div>
            </div>
        )
    }


}
