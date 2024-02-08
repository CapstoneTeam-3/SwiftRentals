"use client"
import { IoIosStar } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { SlHeart } from "react-icons/sl";
import Dropdown from "../components/Dropdown";
import { IoFilterSharp } from "react-icons/io5";

export default function AdminHome() {
    return (
        <main className="min-h-screen w-full bg-[#f1f1fc]">
            <div className="container mx-auto md:max-w-[1050px] py-5">
                {Filter()}
                <div className="mt-10 mb-8 flex justify-between items-baseline">
                    <h1 className="text-3xl mb-5 font-semibold">Choose your vehicle</h1>
                    <h2 className="text-xl font-light">200+ cars available</h2>
                </div>
                <div className="grid grid-cols-1 gap-5">
                    {[1, 2, 3, 4, 5].map((item) =>
                        <div className="flex border bg-white rounded-2xl overflow-hidden">
                            <div className="w-[300px]">
                                <img src="images/car.png" className="h-[180px] w-full object-cover" />
                            </div>
                            <div className="flex flex-col flex-1 py-2 px-3">
                                <div className="flex-1 flex flex-col">
                                    <div className="flex justify-between">
                                        <h2 className="text-xl font-bold">Mustang</h2>
                                        <div className="bg-white rounded-md p-2 shadow-sm">
                                            <SlHeart />
                                        </div>
                                    </div>
                                    <span className="flex items-center mt-2 mb-1 text-lg">4.87 <IoIosStar className="mx-1" />(103 trips)</span>
                                    <span className="flex items-center"><FaMapLocationDot className="me-2" /> Location</span>
                                </div>
                                <span className="text-lg font-bold mb-1 text-right me-2">CAD $198.00 total</span>
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
                <div className="flex gap-5">
                    <Dropdown label="Sort by" options={sortByOptions} onChange={handleDropdownChange} />
                    <Dropdown label="Make" options={sortByOptions} onChange={handleDropdownChange} />
                    <Dropdown label="Transmission" options={sortByOptions} onChange={handleDropdownChange} />
                    <button
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
                    >
                        <IoFilterSharp className="me-3"/>
                        Filters
                    </button>

                </div>
            </div>
        )
    }


}
