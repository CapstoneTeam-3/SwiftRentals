"use client"
import { fetchCars } from "@/redux/features/cars/carSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Car } from "@/types";
import { useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";


type CarTable = {
    headers: string[];
    cols: (keyof Car)[];
};

const car_table: CarTable = {
    headers: ["Make", "Model", "Manufacturing Year", "Is Available", "Price", "Images", "Description", "Location", "Features"],
    cols: ["make", "model", "manufacturing_year", "is_available", "price", "images", "description", "location", "features"]
}


export default function Cars() {
    const dispatch = useAppDispatch();
    const car = useAppSelector(state => state.car);
    console.log('car ', car);

    useEffect(() => {
        dispatch(fetchCars());
    }, [])


    return (
        <main className="min-h-screen w-full bg-[#f1f1fc]">
            <div className="container mx-auto md:max-w-[1050px] py-5">
                <h1 className="text-3xl mb-5">Cars List</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        {TableHeader()}
                        <tbody>
                            {!car?.loading && car?.success && car?.carList?.map((item, rowIndex) =>
                                TableRow(rowIndex, item)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )

    function TableHeader() {
        return (
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Sr.
                    </th>
                    {car_table.headers.map((header, index) => <th scope="col" className="px-6 py-3">
                        {header}
                    </th>
                    )}
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>)
    }

    function TableRow(rowIndex: number, item: never) {
        return <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">
                {rowIndex + 1}
            </td>
            {car_table.cols.map((col, colIndex) => <td key={colIndex} className="px-6 py-4">
                {item[col]}
            </td>
            )}
            <td className="px-6 py-4 flex items-center gap-4">
                <MdOutlineModeEdit color="#FBE41D" size={25} />
                <MdOutlineDeleteOutline color="#DA131A" size={25} />
            </td>
        </tr>;
    }
}