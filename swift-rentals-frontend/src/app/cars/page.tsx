"use client";

import { carAPI } from "@/api/cars";
import { fetchCars, setSelectedCar } from "@/redux/features/cars/carSlice";
import { selectToken, selectUser } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Car } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosStar } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { MdOutlineBallot } from "react-icons/md";
import { SlHeart } from "react-icons/sl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Dropdown from "../components/Dropdown";
import ManageAvailability from "../components/ManageAvailability/ManageAvailability";
import NoSSRWrapper from "../components/NoSSRWrapper/NoSSRWrapper";

export default function CarList() {
  const token = useSelector((state: RootState) => selectToken(state));
  const userData = useSelector((state: RootState) => selectUser(state));

  const route = useRouter();

  const dispatch = useAppDispatch();
  const car = useAppSelector((state) => state.car);
  const [wishListCars, setwishListCars] = useState([]);

  useEffect(() => {
    dispatch(fetchCars(1));
    if(userData.role === 'car rental'){
      getWishList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleCarClick = (car: Car) => {
    dispatch(setSelectedCar({ car }));
    route.push("/cars/detail");
  };

  const handleToWishClick = async (car_id: string) => {
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

  const getWishList = async () => {
    try {
      const responce = await carAPI.getCarsInWishList(token);

      if (responce?.status == 200) {
        const wishListCarIds = responce?.data?.carsInWishlist?.map(
          (wishlist: { _id: string }) => wishlist._id
        );
        setwishListCars(wishListCarIds);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [open, setOpen] = useState<String>("");
  const onOpenModal = (id: String) => setOpen(id);
  const onCloseModal = () => setOpen("");

  return (
    <main className="min-h-screen w-full">
      <NoSSRWrapper>
        <div className="container mx-auto md:max-w-[1050px] py-5">
          {Filter()}
          <div className="mt-10 mb-8 flex flex-wrap justify-between items-baseline">
            <h1 className="text-3xl mb-5 font-semibold">Choose your vehicle</h1>
            <h2 className="text-xl font-light">
              {`${car?.totalCars ?? 0}`} car{car?.totalCars > 1 && "s"}{" "}
              available
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {car.carList?.map((item: Car, index) => (
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
                    priority={true} 
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
                        {userData.role !== "car owner" && (<div className="bg-white rounded-md p-2 shadow-sm cursor-pointer">
                          {wishListCars &&
                          wishListCars.some((c) => c === item._id) ? (
                            <FaHeart
                              onClick={() => handleToWishClick(item._id)}
                            />
                          ) : (
                            <SlHeart
                              onClick={() => handleToWishClick(item._id)}
                            />
                          )}
                        </div>)}
                        {userData.role === "car owner" && (<button
                          onClick={() => onOpenModal(item?._id)}
                          className="bg-white rounded-md p-2 shadow-sm"
                        >
                          <MdOutlineBallot />
                        </button>)}
                        {open == item._id && userData.role === "car owner" && (
                          <div
                            className="fixed top-0 left-0 right-0 h-full overflow-y-auto backdrop-blur-md"
                            aria-labelledby="modal-title"
                            role="dialog"
                            aria-modal="true"
                          >
                            <div className="relative mx-auto w-11/12 md:w-8/12 py-4 px-4 z-20">
                              <div className="bg-white rounded-lg shadow-xl">
                                <div className="flex justify-end p-4">
                                  <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    onClick={() => setOpen("")}
                                  >
                                    <AiOutlineClose />
                                  </button>
                                </div>
                                <div className="p-6 pt-0 overflow-y-auto">
                                  <ManageAvailability
                                    carId={item?._id}
                                    onCloseModal={onCloseModal}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
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
            ))}
          </div>
        </div>
      </NoSSRWrapper>
    </main>
  );

  function Filter() {
    const sortByOptions = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ];

    const handleDropdownChange = (selectedOption: any) => {
      // console.log('Selected option:', selectedOption);
    };

    return (
      <div className="flex items-center mt-2">
        <div className="flex flex-wrap gap-5">
          <Dropdown
            label="Sort by"
            options={sortByOptions}
            onChange={handleDropdownChange}
          />
          <Dropdown
            label="Make"
            options={sortByOptions}
            onChange={handleDropdownChange}
          />
          <Dropdown
            label="Transmission"
            options={sortByOptions}
            onChange={handleDropdownChange}
          />
          <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm">
            <IoFilterSharp className="me-3" />
            Filters
          </button>
        </div>
      </div>
    );
  }
}
