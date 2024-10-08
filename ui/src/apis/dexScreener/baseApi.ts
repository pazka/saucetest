import axios, { AxiosRequestConfig, AxiosResponse } from "axios";



const baseRequester = axios.create({
    baseURL: "https://api.dexscreener.com/",
    timeout: 10000,
});

async function getApi<A>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<A>> {
    //generic params
    return baseRequester.get(url, config);
}

async function postApi<A>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<A>> {
    return baseRequester.post(url, data, config);
}

export { getApi, postApi };

