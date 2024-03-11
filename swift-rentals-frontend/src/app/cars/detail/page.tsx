"use client";
import { IoIosStar } from "react-icons/io";
import { FaMapLocationDot } from "react-icons/fa6";
import { SlHeart } from "react-icons/sl";
import SimpleSlider from "@/app/components/Slider";
import { useAppSelector } from "@/redux/hooks";
import Booking from "@/app/components/Booking/Booking";

export default function CarDetail() {
  const { selectedCar } = useAppSelector((state) => state.car);

  // console.log('selectedCar ', selectedCar);

  if (!selectedCar) return;

  return (
    <main className="min-h-screen w-full p-1">
      <div className="h-[500px] w-full">
        <SimpleSlider images={["/images/car.png", "/images/car.png"]} />
        {/* <SimpleSlider images={selectedCar?.images} /> */}
      </div>
      <div className="container mx-auto md:max-w-[1250px] py-5 px-1">
        <div className="flex flex-row flex-wrap pt-10">
          <div className="mb-8 w-full lg:w-2/3 lg:pe-5">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h1 className="text-3xl mb-1 font-semibold">
                {selectedCar?.model}
              </h1>
              <h2 className="text-md font-light">{selectedCar?.make}</h2>
              <span className="flex items-center mt-3 mb-1 text-xl font-bold">
                4.87 <IoIosStar className="mx-1" />
                (103 trips)
              </span>
              <h2 className="text-lg font-semibold mt-5 mb-2">Description</h2>
              <p>{selectedCar?.description}</p>

              <h2 className="text-lg font-semibold mt-5 mb-2">Features</h2>
              <div className="grid grid-cols-2 gap-4 max-w-[500px]">
                {selectedCar?.Features?.map((feature) => (
                  <div className="flex items-center">
                    <img
                      src="/images/car.png"
                      className="h-[30px] w-[30px] object-contain"
                    />
                    <span className="ms-2">{feature?.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 shadow-md rounded-xl bg-white p-8">
              <span className="text-lg font-bold mb-1 text-right me-2">
                CAD ${selectedCar.price ?? 0} total
              </span>
              <hr className="mt-5 mb-1" />
              <Booking carId = {selectedCar._id}/>
          </div>
        </div>
      </div>
    </main>
  );
}
