"use client";
import Booking from "@/app/components/Booking/Booking";
import NoSSRWrapper from "@/app/components/NoSSRWrapper/NoSSRWrapper";
import SimpleSlider from "@/app/components/Slider";
import { selectToken, selectUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import Rating from "react-rating";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CarDetail() {
  const { selectedCar } = useAppSelector((state) => state.car);
  const [selectedRating, setSelectedRating] = useState<number>();
  const userData = useSelector((state: RootState) => selectUser(state));
  
  const token = useSelector((state: RootState) => selectToken(state));
  const router = useRouter();

  const submitRating = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/rating/add-rating",
        {
          user_id: "65d9762d267059450d0b11eb",
          car_id: selectedCar?._id,
          rating: selectedRating,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status == 200) {
        toast.success("Rating Successfull!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  if (!selectedCar) return;

  return (
    <main className="min-h-screen w-full p-1">
      <NoSSRWrapper>
        <div className="h-2/4 w-full">
          <SimpleSlider images={selectedCar.images} />
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
                  <>
                    {selectedCar?.ratings?.average}{" "}
                    <IoIosStar color="#FCD71E" className="mx-1" />(
                    {selectedCar?.ratings?.count} trips)
                  </>
                </span>
                {userData.role !== "car owner" && (
                  <div className="mt-5">
                    <h2 className="text-lg font-semibold mt-5 mb-2">
                      Provide Rating
                    </h2>
                    <div className="flex items-center">
                      <Rating
                        onChange={(value: number) => setSelectedRating(value)}
                        emptySymbol={
                          <IoIosStarOutline
                            color="#FCD71E"
                            className="mx-1"
                            size={25}
                          />
                        }
                        fullSymbol={
                          <IoIosStar
                            color="#FCD71E"
                            className="mx-1"
                            size={25}
                          />
                        }
                      />
                      <button
                        onClick={submitRating}
                        className="bg-black text-white font-semibold p-3 w-48 rounded-full hover:opacity-80 transition-opacity"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                )}
                <h2 className="text-lg font-semibold mt-5 mb-2">Description</h2>
                <p>{selectedCar?.description}</p>

                <h2 className="text-lg font-semibold mt-5 mb-2">Features</h2>
                <div className="grid grid-cols-2 gap-4 max-w-[500px]">
                  {selectedCar?.Features?.map((feature) => (
                    <div className="flex items-center">
                      {/* <img
                        src="/images/car.png"
                        className="h-[30px] w-[30px] object-contain"
                      /> */}
                      <span className="ms-2">{feature?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/3 shadow-md rounded-xl bg-white p-8 min-h-72">
              <span className="text-lg font-bold mb-1 text-right me-2">
                CAD ${selectedCar.price ?? 0} total
              </span>
              <hr className="mt-5 mb-1" />
              {userData.role === "car owner" && (
                <div>
                  <h1 className="text-xl font-semibold my-2">
                    Your Car Availability
                  </h1>
                  <div className="flex">
                    {selectedCar?.availability?.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {selectedCar?.availability.map(
                          (item: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                            >
                              {new Date(item.date).toLocaleString("en-US", {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      <p>No Car Availability</p>
                    )}
                  </div>
                </div>
              )}
              {userData.role !== "car owner" && (
                <Booking carId={selectedCar._id} car={selectedCar} />
              )}
            </div>
          </div>
        </div>
      </NoSSRWrapper>
    </main>
  );
}
