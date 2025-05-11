import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8082/sign-in";

export const signIn = (signInData) => axios.post(REST_API_BASE_URL, signInData, {
    headers: {
        'Content-Type': 'application/json'
    }
});