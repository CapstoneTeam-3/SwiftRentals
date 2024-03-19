import axios from "axios"
const BASEURL = "http://localhost:3001/api"
const token = '';

export const featuresAPI = {
    getFeatureList: () => {
        return axios.get(`${BASEURL}/car/get-all-features/`,{
            headers: {
                "Authorization": token
            }
        })
    },
}