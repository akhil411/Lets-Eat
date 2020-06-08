import axios from "axios";

export default {
    registerUser: function (userData) {
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "http://localhost:3000/",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
          }
        return axios.post("https://rxhqebx3m4.execute-api.ap-southeast-2.amazonaws.com/dev/user", userData, { headers: headers });
    },
    loginUser: function (userData) {
        console.log(userData.email);
        return axios.get("https://rxhqebx3m4.execute-api.ap-southeast-2.amazonaws.com/dev/user/" + userData.email);
    },
}