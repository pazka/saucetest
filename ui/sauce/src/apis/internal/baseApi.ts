import axios, { AxiosRequestConfig, AxiosResponse } from "axios";



const baseRequester = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
});

const authenticationMiddlewareRequestIntercepter = (config: any) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

const authenticationMiddlewareResponseIntercepter = (response: any) => {
    if (response.headers['set-authorization']) {
        localStorage.setItem("token", response.headers['set-authorization']);
    }
    return response;
}

baseRequester.interceptors.request.use(authenticationMiddlewareRequestIntercepter);
baseRequester.interceptors.response.use(authenticationMiddlewareResponseIntercepter);


async function getApi<A>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ServiceResponse<A>>> {
    //generic params
    return baseRequester.get(url, config);
}

async function postApi<A>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<ServiceResponse<A>>> {
    return baseRequester.post(url, data, config);
}

export { baseRequester, getApi, postApi };

