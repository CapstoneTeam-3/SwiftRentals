"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FcApprove, FcDisapprove } from 'react-icons/fc';
import { MdPending } from 'react-icons/md';
import { Booking } from '@/types';
import { fetchBooking } from '@/redux/features/booking/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSelector } from 'react-redux';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { carAPI } from '@/api/cars';
import { toast } from 'react-toastify';
import { RootState } from '@/redux/store';
import { selectToken } from '@/redux/features/user/userSlice';

export default function BookingList() {
    const router = useRouter();
    const token = useSelector((state: RootState) => selectToken(state));

    const dispatch = useAppDispatch();
    const bookingList = useAppSelector((state) => state.booking.bookingList);
    const loading = useAppSelector((state) => state.booking.loading);

    const handlerRejectBooking = async (booking_id: string, booking_status: boolean ) => {
        const data = {
            "booking_id": booking_id,
            "booking_status": booking_status
        }
    
        try {
          const response = await carAPI.bookingRequests(data, token);
          if (response?.data?.message) {
            toast.success(response?.data?.message);
            dispatch(fetchBooking({ user_id: '65c28bc1f817b57985878e72', active: false }));
        }
        } catch (error) {
          console.error(error);
        }
    }

    const formatDate = (dateString: string) => {
        const inputDate = new Date(dateString);
        const nextDate = new Date(inputDate);
        nextDate.setDate(inputDate.getDate() + 1);
        return nextDate.toLocaleDateString('en-CA', { month: 'short', day: '2-digit' });
    }

    useEffect(() => {
        dispatch(fetchBooking({ user_id: '65c28bc1f817b57985878e72', active: false }));
    }, []);

    return (
        <main className="min-h-screen w-full">
            <div className="container mx-auto md:max-w-[1050px] py-5">
                <div className="mt-10 mb-8 flex flex-wrap justify-between items-baseline">
                    <h1 className="text-3xl mb-5 font-semibold">
                        Your Bookings Requests
                    </h1>
                    <h2 className="text-xl font-light">Total: {bookingList.length}</h2>
                </div>

                {bookingList.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 px-1">
                        {loading ? (
                            [1, 2, 3, 4].map((_, index) => (
                                <div key={index} className={`flex flex-col flex-wrap border rounded-2xl overflow-hidden md:flex-row bg-gray-100 text-gray-400`}>
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
                        ) : (
                            bookingList.map((item: Booking, index: number) => (
                                <div key={index} className="flex flex-col flex-wrap border rounded-2xl overflow-hidden md:flex-row">
                                    <div className="w-full md:w-[300px]">
                                        <Image
                                            src={item?.Car.images[0]?.secure_url ? item?.Car.images[0]?.secure_url : '/images/car-placeholder.png'}
                                            alt="Car"
                                            width={300}
                                            height={180}
                                            layout="responsive"
                                            className="w-full h-[180px] bg-[#f7f4f4]"
                                            onError={(e) => { (e.target as HTMLImageElement).src = '/images/car-placeholder.png' }}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 py-2 px-3">
                                        <div className="flex justify-between flex-1">
                                            <h2 className="text-xl font-bold">{item?.Car.model}</h2>
                                            <span className="flex flex-col text-2xl sm:text-3xl">
                                                <h3 className="text-lg font-semibold">
                                                    {item.is_booked === 'ACCEPTED' && (
                                                        <>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-200 text-green-800">
                                                                <FcApprove className="mr-1.5 h-5 w-5" />
                                                                Approved
                                                            </span>
                                                        </>
                                                    )}
                                                    {item.is_booked === 'PENDING' && (
                                                        <>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-yellow-100 text-yellow-800">
                                                                <MdPending className="mr-1.5 h-5 w-5" />
                                                                Pending
                                                            </span>
                                                        </>
                                                    )}
                                                    {item.is_booked === 'REJECTED' && (
                                                        <>
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                                                                <FcDisapprove className="mr-1.5 h-5 w-5" />
                                                                Rejected
                                                            </span>
                                                        </>
                                                    )}
                                                </h3>
                                                {item.is_booked === "PENDING" && <div className='flex flex-col justify-between item-center my-2'>
                                                    <div className='flex justify-center item-center'>
                                                        <button onClick={() => handlerRejectBooking(item._id, true)} className="bg-green-200 rounded-xl w-fit p-3 m-1 text-xl">
                                                            <FaCheckCircle color="green" />
                                                        </button>
                                                        <button onClick={() => handlerRejectBooking(item._id, false)} className="bg-red-200 rounded-xl w-fit p-3 m-1 text-xl">
                                                            <FaTimesCircle color="red" />
                                                        </button>
                                                    </div>
                                                </div>}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap">
                                            <span className='text-base'>
                                                <span className='text-black-900'>
                                                    <b>From:</b> {item.User.name}
                                                </span>
                                                <br />
                                                <span className='text-black-900'>
                                                    <b>Email:</b> {item.User.email}
                                                </span>
                                                <br />
                                                <p className='bg-gray-200 text-black-700 px-1.5 py-2 my-2 rounded-xl inline-block'>
                                                    {formatDate(item.start_date)}
                                                    {' - '}
                                                    {formatDate(item.end_date)}
                                                </p>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-200 border rounded-md p-4">
                        <p className="text-gray-700">No bookings available.</p>
                    </div>
                )}

            </div>
        </main>
    );
}
