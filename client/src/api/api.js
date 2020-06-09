import axios from "axios";

export default {
    registerUser: function (userData) {
        const headers = {
            "Access-Control-Allow-Origin": "*",
          }
        return axios.post("https://rxhqebx3m4.execute-api.ap-southeast-2.amazonaws.com/dev/user", userData, { headers: headers });
    },
    loginUser: function (userData) {
        return axios.get("https://rxhqebx3m4.execute-api.ap-southeast-2.amazonaws.com/dev/user/" + userData.email);
    },
}