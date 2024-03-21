import axios from "axios";

const BASEURL = "http://localhost:3001/api";

interface Data {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    dob: string;
    role: string;
}

export const authAPI = {
    signup: (data : Data) => {
        return axios.post(`${BASEURL}/auth/register`, 
            data
        );
    },
    login: (data: Data) => {
        return axios.post(`${BASEURL}/auth/login`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    },
    forgotPassword: (email: string) => {
        return axios.post(
            `${BASEURL}/auth/forgot-password`,
            { email: email },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    },
    resetPassword: (
        token: string,
        newPassword: string,
        confirmPassword: string
    ) => {
        return axios.post(`${BASEURL}/auth/reset-password?token=${token}`, {
            newPassword,
            confirmPassword,
        });
    },
};
