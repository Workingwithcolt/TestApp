import { urlHead } from "./extrapropertise";

export const fetchHelper = async (endpoint, method, data, options) => {
    var url = `https://backend-client-management.vercel.app/${endpoint}`
    if (options) {
        const queryParams = new URLSearchParams(options);
        url = url + `?${queryParams.toString()}`;
    }
    console.log(url);
    if (data) {
        data = JSON.stringify(data)
    }
    try {
        var response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
            mode: 'cors',
        })
        const responseJson = await response.json();
        if (response.ok) return responseJson;
        var errorMessage =
            "Server error:" +
            response.status +
            " Message: " +
            responseJson.message;

        return Promise.reject(errorMessage);
    } catch (e) {
        return Promise.reject(e.message)
    }
}