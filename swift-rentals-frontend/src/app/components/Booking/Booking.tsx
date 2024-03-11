import React, { useEffect, useState } from "react";
import { carAPI } from "@/api/cars";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const Datepicker = dynamic(() => import("react-tailwindcss-datepicker"), { ssr: false });

interface BookingProps {
  carId: string;
}

interface DateRange {
  startDate: Date;
  endDate: Date | null;
}

const Booking : React.FC<BookingProps> = ({carId}) => {

  const router = useRouter();
  
  const [range, setRange] = useState<DateRange>({
    startDate : new Date(),
    endDate: null
  })
  const [datepickerLoading, setDatepickerLoading] = useState(true);

  useEffect(() => {
    setDatepickerLoading(false);
  }, []);

  const handleInputChange = (newDateRange: DateRange) => {
    setRange(newDateRange)

  };

  const isValidBooking = () => {
    return range.startDate && range.endDate && range.startDate < range.endDate;
  };

  const handlerBooking = async () => {

    if (!isValidBooking()) {
      toast.error("Please select a valid date range to book.");
      return;
    }

    const data = {
        "start_date":range.startDate ,
        "end_date": range.endDate,
        "car_id": carId,
        "user_id": "65c28bc1f817b57985878e72",
    }

    try {
        const response = await carAPI.createCarBooking(data);
        if (response?.data?.message) {
          router.push("/cars");
          toast.success("Car Booking requested Successfully!");
      }
      } catch (error) {
        console.error(error);
      }
  }
  

  return (
        <div className="flex flex-wrap">

            <h3 className="mb-2 mt-4">Select Date to book</h3>
            {datepickerLoading ? (
          <div>Loading Datepicker...</div>
        ) : (
          <div className="w-full border-2 border-indigo-500 rounded-xl shadow-l">
            <Datepicker
              containerClassName="relative w-full flex justify-center rounded-xl shadow-l"
              inputClassName="text-sm sm:text-l p-3 bg-white-500 w-full rounded-xl border-b-2 shadow-l"
              toggleClassName="absolute right-0 bg-blue-100 text-black h-full px-3 rounded-r-xl shadow-l"
              minDate={new Date()}
              value={range} 
              onChange={handleInputChange}
              placeholder="Select Date Range"
            />
          </div>
        )}

          <button onClick={handlerBooking} className="bg-black text-white font-semibold p-3 w-48 rounded-full mt-4 hover:opacity-80 transition-opacity">
            Book
          </button>

        </div>
  );
};

export default Booking;
