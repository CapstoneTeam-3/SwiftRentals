import axios from "axios";
const BASEURL = "http://localhost:3001/api";
const token = "";

export const carAPI = {
  getCarList: ({ page = 1, token }: { page: number; token: string | null }) => {
    return axios.get(`${BASEURL}/car/get-cars?page=${page}`, {
      headers: {
        Authorization: token,
      },
    });
  },
  addCar: (formData: any) => {
    return axios.post(`${BASEURL}/car/add-car/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
  },
  deleteCar: (id: string) => {
    return axios.delete(`${BASEURL}/car/delete-car/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },
  addAvailabilityCreate: (formData: object, token: string | null) => {
    return axios.post(`${BASEURL}/car/add-availability/`, formData, {
      headers: {
        Authorization: token,
      },
    });
  },
  listAvailability: (id: string, token: string | null) => {
    return axios.get(`${BASEURL}/car/list-availability?car_id=${id}`, {
      headers: {
        Authorization: token,
      },
    });
  },
  deleteAvailability: (data: object, token: string | null) => {
    return axios.delete(`${BASEURL}/car/delete-availability`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      data: data,
    });
  },
  createCarBooking: (formData: any) => {
    return axios.post(`${BASEURL}/booking/create/`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  },
  getAllBookingRequestsWithFilter: ({
    user_id,
    active,
  }: {
    user_id: string;
    active?: boolean;
  }) => {
    const queryParams = active
      ? `?user_id=${user_id}&active=${active}`
      : `?user_id=${user_id}`;
    return axios.get(`${BASEURL}/booking/list/${queryParams}`);
  },
  bookingRequests: (formData: any) => {
    return axios.post(`${BASEURL}/booking/respond/`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  triggerToWishList: (car_id: string, token: string | null) => {
    return axios.post(
      `${BASEURL}/car/trigger-car-to-wishlist/`,
      { car_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
  },
  getCarById: (car_id: string) => {
    return axios.get(`${BASEURL}/car/get-car/${car_id}`);
  },
  getCarsInWishList: (token: string | null) => {
    return axios.get(`${BASEURL}/car/get-cars-in-wishlist/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
  },
};
