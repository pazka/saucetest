import { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseRequester } from "../internal/baseApi";


async function getApi<A>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<A>> {
    //generic params
    return baseRequester.get("0x/"+url, config);
}

async function postApi<A>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<A>> {
    return baseRequester.post("0x/"+url, data, config);
}

export { getApi, postApi };

