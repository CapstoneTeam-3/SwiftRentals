import axios from "axios";
const BASEURL = "http://localhost:3001/api/driver-license";

export const driverLicenseAPI = {
    getDriverLicense: (userId: string | null, token: string | null) => {
        return axios.get(`${BASEURL}/get?userId=${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });
    },
    addDriverLicense: (formData: any, token: string | null) => {
        return axios.post(`${BASEURL}/`, formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            }
        });
    },
};
