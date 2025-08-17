import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import storage from "../../storage/auth.local-storage";
const HTTP_UNAUTHORIZED = 401;

const protectedApi = axios.create({
    baseURL: "/api",
    timeout: 15000
});

protectedApi.interceptors.request.use(onRequestSuccess);
protectedApi.interceptors.response.use(onResponseSuccess, onResponseError);

export default protectedApi;

function onRequestSuccess(config: InternalAxiosRequestConfig) {
    const token = storage.getAccessToken();
    if (!token) {
        throw new Error("Get token from browser storage fail");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
}

function onResponseSuccess(response: AxiosResponse) {
    return response;
}

async function onResponseError(error: AxiosError) {
    const statusCode = error.response?.status;
    if (statusCode == HTTP_UNAUTHORIZED) {
        storage.clearAllTokens();
    } else {
        throw error;
    }
}
