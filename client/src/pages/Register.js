import React from 'react';
import NavBar from '../components/NavBar';
import AuthForm from '../components/forms/AuthForm';
import authService from '../services/authService';
import { interceptPage } from '../components/interceptPage';

const Register = ({ user, onSuccess, next }) => (
    <div className="center">
        <NavBar user={user} />
        <AuthForm
            type="register"
            onSubmit={({ username, password, email, team }) => {
                authService
                    .register(username, password, email, team)
                    .then(resp => {
                        const { user } = resp;
                        onSuccess(user);
                        next();
                    })
                    .catch(err => {
                        console.log('Register failed: ', err);
                    });
            }}
        />
    </div>
);

export default interceptPage(Register);
