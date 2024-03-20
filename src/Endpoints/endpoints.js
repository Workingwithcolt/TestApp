import { fetchHelper } from "../helper/fetchHelper";

const POST_METHOD = "POST";
const GET_METHOD = "GET";
const PUT_METHOD = "PUT";
const DELETE_METHOD = "DELETE";

const USER_ENDPOINT = "users";

export const UPDATE_ON_USER = "UpdateOnUser";
export const UPDATE_ON_ACCOUNT = "UpdateOnAccount"
export const UPDATE_ON_FILE = "UpdateOnFile"

class CRUDMethods {
    constructor(endpoint) {
        this.endpoint = endpoint
    }

    async create(accessToken, body = null) {
        return fetchHelper(accessToken, this.endpoint, POST_METHOD, body);
    }

    async getOne(id, accessToken, body = null, options = null) {
        return fetchHelper(accessToken, this.endpoint + "/" + id, GET_METHOD, body, options);
    }

    async update(accessToken = null, body = null, options = null) {
        return fetchHelper(accessToken, this.endpoint, PUT_METHOD, body, options)
    }
    async delete(accessToken, body = null, options = null) {
        return fetchHelper(accessToken, this.endpoint, DELETE_METHOD, body, options);
    }

}

export var endpoints = {
    Users: new CRUDMethods(USER_ENDPOINT),
    SignUp: new CRUDMethods()
}