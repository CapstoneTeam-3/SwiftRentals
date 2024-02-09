import axios from "axios"
const BASEURL = "http://localhost:3001/api"

export const featuresAPI = {
    getFeatureList: async (): Promise<any> => {
        return await axios.get(`${BASEURL}/car/get-all-features/`).then((response) => {
            console.log('response?.data ', response?.data);
            
            return response
        }).catch((error) => {
            console.log('error ', error);
            return error;
        })
    },
}