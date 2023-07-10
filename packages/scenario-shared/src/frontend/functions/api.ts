import {getAxiosInstance} from './axios-instance';

export async function getData(url: string) {
    try {
        const response = await getAxiosInstance().get(url);
        return response.data;
    } catch (error) {
        console.error('Fehler beim GET-Request:', error);
        throw error;
    }
}

export async function putData(url: string, data: unknown) {
    try {
        const response = await getAxiosInstance().put(url, data);
        return response.data;
    } catch (error) {
        console.error('Fehler beim PUT-Request:', error);
        throw error;
    }
}

export async function postData(url: string, data: unknown) {
    try {
        const response = await getAxiosInstance().post(url, data);
        return response.data;
    } catch (error) {
        console.error('Fehler beim POST-Request:', error);
        throw error;
    }
}

export async function deleteData(url: string, data: unknown) {
    try {
        const response = await getAxiosInstance().delete(url);
        return response.data;
    } catch (error) {
        console.error('Fehler beim DELETE-Request:', error);
        throw error;
    }
}
