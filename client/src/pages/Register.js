import React from 'react';
import NavBar from '../components/NavBar';
import AuthForm from '../components/AuthForm';
import authService from '../services/authService';

const Register = (props) => (
    <div>
        <NavBar user={props.user} />
        <h1>Register</h1>
        <AuthForm
            onSubmit={({ user, password, email }) => {
                authService
                    .register(user, password, email)
                    .then(resp => {
                        console.log('Register successful: ', resp);
                    })
                    .catch(err => {
                        console.log('Register failed: ', err);
                    });
            }}
        />
    </div>
);

export default Register;
