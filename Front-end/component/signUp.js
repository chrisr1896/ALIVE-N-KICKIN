import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../App.css'

export const SignUp = (userInput, onFormChange, onFormSubmit) => {
    
    const handleChange = (event) => {
        onFormChange(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault(
            onFormSubmit()
        )
    };
     
    return (
        <div className="login-form">
            <h1 className="font-weight-bold text-center">Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Username</Label>
                    <Input type='text' placeholder='Username' required value={userInput}  onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' placeholder='Email' required value={userInput} onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' placeholder='Password' required value={userInput} onChange={handleChange}/>
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