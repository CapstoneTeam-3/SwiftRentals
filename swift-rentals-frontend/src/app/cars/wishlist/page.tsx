"use client";

import { carAPI } from "@/api/cars";
import { setSelectedCar } from "@/redux/features/cars/carSlice";
import { selectToken } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Car } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsBookmarkX } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function CarWishList() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const route = useRouter();
  const dispatch = useAppDispatch();

  const token = useSelector((state: RootState) => selectToken(state));
  if(!token){
    toast.error("Please login first")
    return route.push("/auth/login")
}

  const handleCarClick = (car: Car) => {
    dispatch(setSelectedCar({ car }));
    route.push("/cars/detail");
  };

  const getWishList = async () => {
    try {
      const response = await carAPI.getCarsInWishList(token);

      if (response?.status === 200) {
        const cars: Car[] = response?.data?.carsInWishlist.map(
          ({
            _id,
            make,
            model,
            manufacturing_year,
            is_available,
            price,
            images,
            description,
            location,
            Features,
            ratings,
          }: Car) => ({
            _id,
            make,
            model,
            manufacturing_year,
            is_available,
            price,
            images: images?.map((image: any) => image?.secure_url),
            description,
            location,
            Features,
            ratings,
          })
        );

        setAllCars(cars);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToWishClick = async (car_id: string) => {
    console.log(car_id);
    try {
      const response = await carAPI.triggerToWishList(car_id, token);
      if (response?.data?.message) {
        toast.success(response?.data?.message);
        getWishList();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWishList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="min-h-screen w-full">
      <div className="container mx-auto md:max-w-[1050px] py-5">
        <div className="grid grid-cols-1 gap-5">
          {loading ? (
            [1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className={`flex flex-col flex-wrap border rounded-2xl overflow-hidden md:flex-row bg-gray-100 text-gray-400`}
              >
                <div className="w-full md:w-[300px] bg-gray-300 h-48"></div>
                <div className="flex flex-col flex-1 py-2 px-3">
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div className="text-xl font-bold bg-gray-300 h-6 w-1/2"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-base bg-gray-300 h-4 w-3/4 mb-2"></div>
                    <div className="text-lg font-semibold flex items-center">
                      <div className="bg-gray-300 h-4 w-8 mr-2"></div>
                      <div className="bg-gray-300 h-4 w-12"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : allCars.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-500 text-2xl md:text-4xl">
              <BsBookmarkX />
              <span>No cars in your wishlist.</span>
            </div>
          ) : (
            allCars.map((item: Car, index) => (
              <div
                key={index}
                className="flex flex-col flex-wrap border bg-white rounded-2xl overflow-hidden md:flex-row"
              >
                <div
                  onClick={() => handleCarClick(item)}
                  className="w-full md:w-[300px]"
                >
                  <Image
                    src={
                      item?.images && item?.images[0]
                        ? item?.images[0]
                        : "/images/car-placeholder.png"
                    }
                    alt="Car"
                    width={300}
                    height={180}
                    layout="responsive"
                    className="w-full h-[180px] bg-[#f7f4f4]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/images/car-placeholder.png";
                    }}
                  />
                </div>
                <div className="flex flex-col flex-1 py-2 px-3">
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h2
                        onClick={() => handleCarClick(item)}
                        className="text-xl font-bold"
                      >
                        {item?.model}
                      </h2>
                      <div className="flex justify-end text-2xl sm:text-3xl">
                        <div className="bg-white rounded-md p-2 shadow-sm">
                          <FaHeart
                            onClick={() => handleToWishClick(item._id)}
                          />
                        </div>
                      </div>
                    </div>
                    <span className="flex items-center mt-2 mb-1 text-lg">
                      <>
                        {item?.ratings?.average} <IoIosStar className="mx-1" />(
                        {item?.ratings?.count} trips)
                      </>
                    </span>
                    <span
                      onClick={() => handleCarClick(item)}
                      className="flex items-center"
                    >
                      <FaMapLocationDot className="me-2" /> {item?.location}
                    </span>
                  </div>
                  <span
                    onClick={() => handleCarClick(item)}
                    className="text-lg font-bold mb-1 text-right me-2"
                  >
                    CAD ${`${item?.price ?? 0}`} total
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
