import axios from "axios"
const BASEURL = "http://localhost:3001/api"

export const carAPI = {
    getCarList: async (): Promise<any> =>{
        return await axios.get(`${BASEURL}/car/get-cars/`).then ( (response) => {
            return response
        }).catch((error) =>{
            console.log('error ', error);
            return error;
        })
    }
}