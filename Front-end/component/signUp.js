import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../App.css'

export const SignUp = (onFormChange, onFormSubmit) => {
    // userInput, 
    // const handleChange = (event) => {
    //     onFormChange(event.target.value)
    // };

    const handleSubmit = (event) => {
        event.preventDefault(
            onFormSubmit()
        )
    };
    //  value={userInput}
    return (
        <div className="login-form">
            <h1 className="font-weight-bold text-center">Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type='text' placeholder='Username' />
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Email'/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' placeholder='Password'/>
                    {/* <Input className="mt-3 mb-3" type='password' placeholder='Confirm'/> */}
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block">Sign Up</Button>
                <div className="text-center">
                <p>Or <a href="/login">Log In</a> here please!</p>
            </div>
            </Form>

        </div>
    )
}