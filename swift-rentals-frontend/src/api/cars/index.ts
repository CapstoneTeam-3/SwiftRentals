import axios from "axios"
import { toast } from "react-toastify"
const BASEURL = "http://localhost:3001/api"

export const carAPI = {
    getCarList: async (): Promise<any> => {
        return await axios.get(`${BASEURL}/car/get-cars/`).then((response) => {
            return response
        }).catch((error) => {
            console.log('error ', error);
            return error;
        })
    },
    addCar: async (formData: any): Promise<any> => {
        try {
            const response = await axios.post(`${BASEURL}/car/add-car/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log('response?.data ', response?.data);
            
            return response;
        } catch (error) {
            console.log('error ', error);
            return error;
        }
    }
}