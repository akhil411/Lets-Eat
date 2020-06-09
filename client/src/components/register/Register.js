import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import API from "../../api/api";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

function Register({ history }) {
    const [userData, setUserData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setErrors(prevData => ({
            ...prevData,
            [name]: ""
        }));
    }

    function formIsValid() {
        const { name, email, password, confirmPassword } = userData;
        const errors = {};

        if (!name) errors.name = "*Name is required.";
        if (!email) errors.email = "*Email is required";
        if (!password) errors.password = "*Password is required";
        if (!confirmPassword) errors.confirmPassword = "*Confirm password is required";
        if (confirmPassword !== password) errors.confirmPassword = "*Passwords should match"

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();
        if (!formIsValid()) return;
        const newUser = {
            name     : userData.name,
            email    : userData.email,
            password : userData.password
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                API.registerUser(newUser)
                    .then((response) => {
                        if (response.status === 200) {
                            toast.success("Register Success!!!")
                            history.push("/login");
                        } else {
                            toast.error("Register Failed!!!");
                        }
                    })
                    .catch((err) => {
                        const errors = {};
                        errors.email = "*Email already exists";
                        setErrors(errors);
                    })
            });
        })
    }

    return (
        <div className="page-content">
            <div className="register-form">
                <Form onSubmit={handleSave}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                        />
                        {errors.name ? <div className="form-error">{errors.name}</div> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Your Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder=""
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                        {errors.email ? <div className="form-error">{errors.email}</div> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder=""
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                        {errors.password ? <div className="form-error">{errors.password}</div> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder=""
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword ? <div className="form-error">{errors.confirmPassword}</div> : null}
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="Show Password"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                </Button>
                </Form>
            </div>
        </div>
    )
}

export default Register;
