import React from 'react';
import AuthForm from '../components/AuthForm';
import NavBar from '../components/NavBar';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';

const Login = ({next, onLoginSuccess, user }) => (
    <div>
        <NavBar user={user} />
        <h1>Login</h1>
        <AuthForm
            onSubmit={({ user, password, email }) => {
                authService
                    .login(user, password, email)
                    .then(resp => {
                        onLoginSuccess(resp);
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
