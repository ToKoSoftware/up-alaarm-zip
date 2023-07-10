import axios, {AxiosInstance} from 'axios';

let axiosInstance: AxiosInstance | null = null;

export function getAxiosInstance() {
    if (!axiosInstance) {
        let apiUrl = '';
        if (localStorage.getItem('apiUrl')) {
            apiUrl = localStorage.getItem('apiUrl') || apiUrl;
        } else {
            apiUrl = prompt('Bitte gib die URL des Servers ein:') || apiUrl;
            localStorage.setItem('apiUrl', apiUrl);
        }

        axiosInstance = axios.create({
            baseURL: apiUrl,
            timeout: 5000,
        });
    }
    return axiosInstance;
}

export function setApiUrl(url: string) {
    localStorage.setItem('apiUrl', url);
    axiosInstance = null;
}

export function getApiUrl() {
    return localStorage.getItem('apiUrl') || '';
}
