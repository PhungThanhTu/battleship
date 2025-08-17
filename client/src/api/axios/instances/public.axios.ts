import axios from "axios";

const publicApi = axios.create({
    baseURL: "/api",
    timeout: 15000
});

export default publicApi;
