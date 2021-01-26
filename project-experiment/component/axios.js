import Axios from "axios";

export const axios = Axios.create({
    baseURL: "http://127.0.0.1:5000",
    headers: { Auth: "Simple Auth" },
    timeour: 3000,
})