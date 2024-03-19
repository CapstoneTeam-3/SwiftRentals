import axios from "axios"
const BASEURL = "http://localhost:3001/api"
const token = '';

export const carAPI = {
    getCarList: ({ page = 1 }) => {
        return axios.get(`${BASEURL}/car/get-cars?page=${page}`,{
            headers: {
                "Authorization": token
            }
        })
    },
    addCar: (formData: any) => {
        return axios.post(`${BASEURL}/car/add-car/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token
            }
        });
    },
    deleteCar: (id: string) => {
        return axios.delete(`${BASEURL}/car/delete-car/${id}`,{
            headers: {
                "Authorization": token
            }
        })
    },
    addAvailabilityCreate: (formData: object) =>{
        return axios.post(`${BASEURL}/car/add-availability/`,formData, {
            headers: {
                "Authorization": token
            }
        })
    },
    listAvailability: (id: string) => {
        return axios.get(`${BASEURL}/car/list-availability?car_id=${id}`,{
            headers: {
                "Authorization": token
            }
        })
    },
    deleteAvailability: (data: object) => {
        return axios.delete(`${BASEURL}/car/delete-availability/`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            data: data,
        });
    },
    createCarBooking: (formData: any) => {
        return axios.post(`${BASEURL}/booking/create/`, formData, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });
    },

}