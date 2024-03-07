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
    addAvailabilityCreate: (formData: any) =>{
        return axios.post(`${BASEURL}/car/add-availability/`,formData, {
        })
    },
    listAvailability: (id: string) => {
        return axios.get(`${BASEURL}/car/list-availability?car_id=${id}`)
    }
}