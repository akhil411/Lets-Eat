import { put, takeLatest } from 'redux-saga/effects';
import setAuthToken from "../../utils/setAuthToken";
import API from "../../api/api";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

function* loginUser(userData) {
    try {
        const json = yield API.loginUser(userData.userData)
            .then(res => {
                if(!res.data) {
                    throw new Error ("Check Email");
                }
                const load = bcrypt.compare(userData.userData.password, res.data.password)
                .then( isMatch => {
                    if (isMatch) {
                        const payload = {
                            email: res.data.email,
                            name: res.data.name,
                        };
                        jwt.sign(
                            payload,
                            "secret",
                            {
                                expiresIn: 3600 
                            },
                            (err, token) => {
                                token = "Bearer " + token;
                                localStorage.setItem("jwtToken", token);
                                setAuthToken(token);
                            }
                        );
                        return payload;
                    } else {
                        throw new Error ("Check Password");
                    }
                })
                return load;
            })
            .catch(error => {
                throw error;
            });
        yield put({
            type: "SET_CURRENT_USER",
            json: json
        });
    }
    catch (err) {
        const error = err.message;
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
