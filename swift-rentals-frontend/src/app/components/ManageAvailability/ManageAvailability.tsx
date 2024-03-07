"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Datepicker from "react-tailwindcss-datepicker";
import { carAPI } from "@/api/cars";

const ManageAvailability = (carId) => {


  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [allDates, setAllDates] = useState([]);

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);

    const startDate = new Date(newDateRange.startDate);
    const endDate = new Date(newDateRange.endDate);
    const datesArray = [];

    while (startDate <= endDate) {
        const formattedDate = startDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        datesArray.push(formattedDate);
        startDate.setDate(startDate.getDate() + 1);
    }
    setAllDates(datesArray);
};

  const handleRemoveDate = (dateToRemove) => {
    const updatedRanges = [...allDates];
    let indexOfSelectedDate = updatedRanges.findIndex(
      (date) => date === dateToRemove
    );
    updatedRanges.splice(indexOfSelectedDate, 1);
    setAllDates([...updatedRanges]);
  };

  const checkSelectedDates = () => {
    if (allDates.length === 0) {
      return (
        <p className="text-center text-gray-500 font-medium mt-4 h-full">
          No date selected. Please choose a date.
        </p>
      );
    } else{ return (
      <div className="md:absolute md:bottom-11 md:right-6">
        <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" onClick={() => submitData()}>Add Dates</button>
      </div>
    )}
  };

  const submitData = async () => {

    const data = {
        "car_id": carId.carId,
        "dates": allDates
    }

    try {
      const response = await carAPI.addAvailabilityCreate(data);
      if (response?.data?.message) {
        alert("Car added Successfully!");
    }
    } catch (error) {
      console.error(error);
    }
  };

  const getCarAvailablityData = async () => {
    try {
      const response = await carAPI.listAvailability(carId.carId);
      console.log(response);
    } catch (error) {
      console.error("List availability", error);
      
    }
  }

  useEffect(() => {
    getCarAvailablityData()
  }, [])


  return (
    <div className="w-full min-h-svh">
      <h1 className="text-center text-3xl sm:text-4xl lg:text-6xl font-semibold mt-14 mb-3">
        Manage Availability
      </h1>
        <Datepicker
          containerClassName="w-full flex justify-center"
          inputClassName="text-sm sm:text-xl rounded-l-md p-3 border-y-2 border-l-2 border-indigo-500 bg-white-500 h-12 w-10/12 sm:w-6/12"
          toggleClassName="bg-blue-100 rounded-r-md border-y-2 border-r-2 border-indigo-500 text-black h-12 px-3"
          minDate={new Date()}
          value={dateRange}
          onChange={handleDateRangeChange}
          placeholder="Select Date Range"
        />

        <div className="w-11/12 sm:w-8/12 mt-3 shadow-lg rounded-lg m-auto h-full">
          <p className="text-xl font-semibold text-center my-2">
            Selected Date Ranges:
          </p>
          <ul className="flex flex-wrap justify-center">
            {allDates.map((date, index) => (
              <li
                key={index}
                className="p-2 sm:p-3 my-1 md:my-2 mx-1 rounded-xl bg-blue-400 text-white shadow-sm flex justify-center text-sm sm:text-xl"
              >
                {date}
                <button onClick={() => handleRemoveDate(date)}>
                  <AiOutlineClose className="pl-2 text-2xl" />
                </button>
              </li>
            ))}
            {checkSelectedDates()}
          </ul>
        </div>
    </div>
  );
};

export default ManageAvailability;
