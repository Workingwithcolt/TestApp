import { urlHead } from "./extrapropertise";

export const fetchHelper = async (accessToken  = null ,endpoint, method, data, options) => {
    var url = `https://test-app-backend-virid.vercel.app/${endpoint}`
    if (options) {
        const queryParams = new URLSearchParams(options);
        url = url + `?${queryParams.toString()}`;
    }
    console.log(url);
    if (data) {
        data = JSON.stringify(data)
    }
    try {
        var requestObject = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data,
            mode: 'cors',
        };
        if (accessToken) {
            requestObject.headers.Authorization = 'Bearer ' + accessToken;
        }
        var response = await fetch(url, requestObject)
       
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