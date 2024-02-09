"use client"
import { IoIosStar } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { SlHeart } from "react-icons/sl";
import Dropdown from "@/app/components/Dropdown";
import SimpleSlider from "@/app/components/Slider";
import { useAppSelector } from "@/redux/hooks";

export default function CarDetail() {
    const { selectedCar } = useAppSelector(state => state.car);

    const timeSlots = [
        { value: '9:00am', label: '9:00am' },
        { value: '10:00am', label: '10:00am' },
        { value: '11:00am', label: '11:00am' },
        { value: '12:00am', label: '12:00am' },
        { value: '1:00pm', label: '1:00pm' },
    ]

    console.log('selectedCar ', selectedCar);
    
    if (!selectedCar) return;

    return (
        <main className="min-h-screen w-full ">
            <div className="h-[500px] w-full">
                <SimpleSlider images={["/images/car.png", "/images/car.png"]} />
                {/* <SimpleSlider images={selectedCar?.images} /> */}
            </div>
            <div className="container mx-auto md:max-w-[1050px] py-5">
                <div className="flex flex-row flex-wrap pt-10">
                    <div className="mb-8 w-full lg:w-2/3 lg:pe-5">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h1 className="text-3xl mb-1 font-semibold">{selectedCar?.model}</h1>
                            <h2 className="text-md font-light">{selectedCar?.make}</h2>
                            <span className="flex items-center mt-3 mb-1 text-xl font-bold">4.87 <IoIosStar className="mx-1" />(103 trips)</span>
                            <h2 className="text-lg font-semibold mt-5 mb-2">Description</h2>
                            <p>{selectedCar?.description}</p>

                            <h2 className="text-lg font-semibold mt-5 mb-2">Features</h2>
                            <div className="grid grid-cols-2 gap-4 max-w-[500px]">
                                {selectedCar.features?.map((feature) =>
                                    <div className="flex items-center">
                                        <img src="/images/car.png" className="h-[30px] w-[30px] object-contain" />
                                        <span className="ms-2">Backup camera</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <span className="text-lg font-bold mb-1 text-right me-2">CAD ${selectedCar.price ?? 0} total</span>
                            <hr className="mt-5 mb-1" />
                            <div className="flex flex-wrap">
                                <div className="me-5">
                                    <h3 className="mb-2 mt-4">FROM</h3>
                                    <div className="flex item-center">
                                        <input type="date" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm me-2" />
                                        <Dropdown label="Time" options={timeSlots} onChange={() => { }} />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-2 mt-4">TO</h3>
                                    <div className="flex item-center">
                                        <input type="date" className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm me-2" />
                                        <Dropdown label="Time" options={timeSlots} onChange={() => { }} />
                                    </div>
                                </div>
                                <button
                                    className="bg-black text-white font-semibold p-3 w-full sm:w-3/4 rounded-full mt-4 hover:opacity-80 transition-opacity"
                                >Book</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
