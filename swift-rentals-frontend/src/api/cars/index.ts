import axios from "axios"
const BASEURL = "http://localhost:3001/api"

export const carAPI = {
    getCarList: ({ page = 1 }) => {
        return axios.get(`${BASEURL}/car/get-cars?page=${page}`)
    },
    addCar: (formData: any) => {
        return axios.post(`${BASEURL}/car/add-car/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },
    deleteCar: (id: string) => {
        return axios.delete(`${BASEURL}/car/delete-car/${id}`)
    },
    addAvailabilityCreate: (formData: object) =>{
        return axios.post(`${BASEURL}/car/add-availability/`,formData, {
        })
    },
    listAvailability: (id: string) => {
        return axios.get(`${BASEURL}/car/list-availability?car_id=${id}`)
    },
    deleteAvailability: (data: object) => {
        return axios.delete(`${BASEURL}/car/delete-availability/`, {
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        });
    },
    createCarBooking: (formData: any) => {
        return axios.post(`${BASEURL}/booking/create/`, formData, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    },
    getAllBookingRequestsWithFilter: ({ user_id, active }: { user_id: string; active?: boolean }) => {
        const queryParams = active ? `?user_id=${user_id}&active=${active}` : `?user_id=${user_id}`;
        return axios.get(`${BASEURL}/booking/list/${queryParams}`)
    },
    bookingRequests: (formData : any ) => {
        return axios.post(`${BASEURL}/booking/respond/`, formData, {
            headers:{
                "Content-Type": "application/json",
            }
        })
    },
    triggerToWishList: (car_id : string ) => {
        return axios.post(`${BASEURL}/car/trigger-car-to-wishlist/` ,{ "car_id": car_id  }, {
            headers:{
                "Content-Type": "application/json",
                "Authorization": "token"
            }
        })
    },
    getCarsInWishList: () => {
        return axios.get(`${BASEURL}/car/get-cars-in-wishlist/`,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": "token"
            }
        })
    }

}