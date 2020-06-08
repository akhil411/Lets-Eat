import { put, takeLatest } from 'redux-saga/effects';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import API from "../../api/api";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

function* loginUser(userData) {
    try {
        const json = yield API.loginUser(userData.userData)
            .then(res => {
                console.log(res);
                const condition = bcrypt.compare(userData.userData.password, res.data.password);
                if (condition) {
                    const payload = {
                        email: res.data.email,
                        name: res.data.name,
                    };
                    jwt.sign(
                        payload,
                        "secret",
                        {
                            expiresIn: 300 
                        },
                        (err, token) => {
                            token = "Bearer " + token;
                            console.log(token);
                            localStorage.setItem("jwtToken", token);
                            setAuthToken(token);
                        }
                    );
                    return payload;
                }
            })
            .catch(err => {
                throw err.response.data;
            });
            console.log(json);
        yield put({
            type: "SET_CURRENT_USER",
            json: json
        });
    }
    catch (error) {
        yield put({
            type: 'SET_CURRENT_USER_FAILED',
            error
        })
    }

}

function* logOutUser(userData) {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    yield put({
        type: "SET_CURRENT_USER",
        json: {},
    });
}

export default function* actionLoginUser() {
    yield takeLatest('LOGIN_USER', loginUser)
    yield takeLatest('LOGOUT_USER', logOutUser)
}
