import axios from "axios";

export default {
    registerUser: function (userData) {
        return axios.post("https://rxhqebx3m4.execute-api.ap-southeast-2.amazonaws.com/dev/user", userData);
    },
    loginUser: function (userData) {
        console.log(userData.email);
        return axios.get("https://rxhqebx3m4.execute-api.ap-southeast-2.amazonaws.com/dev/user/" + userData.email);
    },
}