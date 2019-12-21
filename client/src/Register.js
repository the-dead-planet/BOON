import React, { Component } from 'react';
import AuthForm from './AuthForm';
import authService from './services/authService';

const Register = () => (
    <div>
        <h1>Login</h1>
        <AuthForm
            onSubmit={({ user, password, email, team }) => {
                authService
                    .register(user, password, email, team)
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
