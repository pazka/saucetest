import { getApi, postApi } from "./baseApi";

export const getAllUser = async () => {
    const response = await getApi("/users");
    return response.data;
}

export const login = async (email: string, password: string) => {
    const response = await postApi<SecureUser>("/users/login", { email, password });
    return response.data;
}

export const createUser = async (name: string, email: string, password: string) => {
    const response = await postApi<SecureUser>("/users", { name, email, password });
    return response.data.responseObject;
}