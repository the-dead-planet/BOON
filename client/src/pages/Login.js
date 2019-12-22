import React, { Component } from 'react';
import AuthForm from '../components/AuthForm';
import NavBar from '../components/NavBar';
import authService from '../services/authService';

const Login = () => (
    <div>
        <h1>Login</h1>
        <AuthForm
            onSubmit={({ user, password, email, team }) => {
                authService
                    .login(user, password, email, team)
                    .then(resp => {
                        console.log('Login successful: ', resp);
                    })
                    .catch(err => {
                        console.log('Login failed: ', err);
                    });
            }}
        />
    </div>
);

export default Login;
