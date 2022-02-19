import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = "http://localhost:3001/api/";

const axiosResponse = (res: AxiosResponse) => res.data

export const request = {
    get: (url: string) => axios.get(url).then(axiosResponse),
    post: (url: string, data: {}) => axios.post(url, data).then(axiosResponse),
    put: (url: string, data: {}) => axios.put(url, data).then(axiosResponse),
    delete: (url: string) => axios.delete(url).then(axiosResponse)
}