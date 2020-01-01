import React from 'react';
import AuthForm from '../components/AuthForm';
import NavBar from '../components/NavBar';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';

const Login = ({ next, onLoginSuccess, user }) => (
    <div>
        <NavBar user={user} />
        <h1>Login</h1>
        <AuthForm
            type="login"
            onSubmit={({ password, email }) => {
                authService
                    .login(password, email)
                    .then(({ user }) => {
                        onLoginSuccess(user);
                        next();
                    })
                    .catch(err => {
                        console.log('Login failed: ', err);
                    });
            }}
        />
    </div>
);

export default interceptPage(Login);
