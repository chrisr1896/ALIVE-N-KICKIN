import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { SignUp } from './signUp';
import '../App.css';
import { FacebookLoginButton, GoogleLoginButton,GithubLoginButton } from 'react-social-login-buttons';


export const Login = () => {
    return(
        <Form className="login-form">
             {/* <h1>
                <span className="text-center font-weight-bold">Login Page</span>
            </h1> */}
            <h1 className="text-center font-weight-bolder">Welcome</h1>
            <FormGroup>
                <Label>Email</Label>
                <Input type='email' placeholder='Email'/>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input type='password' placeholder='Password'/>
            </FormGroup>
            
            <Button className="btn-lg btn-dark btn-block">Log In</Button>
            <div className="text-center pt-3">
                Or continue with your social account
            </div>
            <FacebookLoginButton className="mt-3 mb-3"/>
            <GithubLoginButton className="mt-3 mb-3"/>
            <GoogleLoginButton className="mt-3 mb-3"/>
            <div className="text-center">
                <p><a href="/signup">Sign Up</a> here please!</p>
            </div>

        </Form>
       
    );
};

