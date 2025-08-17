import 'dotenv/config'
const API_ENDPOINT = process.env.API_SERVER ?? "";

import axios from "axios";

const publicApi = axios.create({
	baseURL: API_ENDPOINT,
	timeout: 15000,
});

export default publicApi;