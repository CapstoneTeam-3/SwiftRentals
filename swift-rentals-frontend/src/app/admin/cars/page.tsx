"use client"
import { carAPI } from "@/api/cars";
import { fetchCars, setSelectedCar } from "@/redux/features/cars/carSlice";
import { selectToken } from "@/redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Car } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


type CarTable = {
    headers: string[];
    cols: (keyof Car)[];
};

const car_table: CarTable = {
    headers: ["Make", "Model", "Manufacturing Year", "Is Available", "Price", "Description", "Location", "Features"],
    cols: ["make", "model", "manufacturing_year", "is_available", "price", "description", "location", "Features"]
}


export default function Cars() {
    const token = useSelector((state: RootState) => selectToken(state));
    const router = useRouter();

    if(!token){
        toast.error("Please login first")
        return router.push("/auth/login")
    }

    const dispatch = useAppDispatch();
    const car = useAppSelector(state => state.car);

    useEffect(() => {
        dispatch(fetchCars(1,));
    }, []);

    const handleDeleteClick = (id: string) => {
        carAPI.deleteCar(id, token).then((response) => {
            dispatch(fetchCars(1));
        }).catch((error) => {
            console.log('deleteCar ', error?.message);
        });
    }
    
    const handleEditClick = (item: Car) => {
        dispatch(setSelectedCar(item));
        router.push('/admin/cars/edit');
    }


    return (
        <main className="min-h-screen w-full">
            <div className="container mx-auto md:max-w-[1050px] py-5">
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
                    {car_table.headers.map((header, index) => <th key={index} scope="col" className="px-6 py-3">
                        {header}
                    </th>
                    )}
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>)
    }

    function TableRow(rowIndex: number, item: Car) {
        return <tr key={rowIndex} className="bg-white border-b hover:bg-gray-50">
            <td className="px-6 py-4">
                {rowIndex + 1}
            </td>
            {car_table.cols.map((col, colIndex) => <td key={colIndex} className="px-6 py-4">
                {col === "Features" ? item.Features.map(feature => feature.name).join(', ')
                    :
                    item[col]}
            </td>
            )}
            <td className="px-6 py-4 flex items-center gap-4">
                <button
                    className="p-2 rounded-md bg-white shadow-md border-1"
                    onClick={() => handleEditClick(item)}>
                    <MdOutlineModeEdit color="#FBE41D" size={25} />
                </button>
                <button
                    className="p-2 rounded-md bg-white shadow-md border-1"
                    onClick={() => handleDeleteClick(item?._id)}>
                    <MdOutlineDeleteOutline color="#DA131A" size={25} />
                </button>
            </td>
        </tr>;
    }
}