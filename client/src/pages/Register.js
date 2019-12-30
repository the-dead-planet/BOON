import React from 'react';
import NavBar from '../components/NavBar';
import AuthForm from '../components/AuthForm';
import authService from '../services/authService';

const Register = (props) => (
    <div>
        <NavBar user={props.user} />
        <h1>Register</h1>
        <AuthForm
            type='register'
            onSubmit={({ username, password, email, team }) => {
                authService
                    .register(username, password, email, team )
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
