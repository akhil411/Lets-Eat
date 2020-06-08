import axios from "axios";
import bcrypt from "bcryptjs";

export default {
    registerUser: function (userData) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userData.password, salt, (err, hash) => {
                if (err) throw err;
                userData.password = hash;
            });
        });
        return axios.post("https://rxhqebx3m4.execute-api.ap-southeast-2.amazonaws.com/dev/user", userData);
    },
    loginUser: function (userData) {
        return axios.post("/api/user/login", userData);
    },
}