import React, { useState, useEffect, useReducer } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { axios } from './axios';
import '../App.css'


// helps with the formatting of the inputs as well
const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}



export const SignUp = () => {
    const [user, setUser] = useState([]);
    const [formData, setFormData] = useReducer(formReducer, {});
    
    // Adds user to the DataBase
    const addUser = async () => {
        const response =await axios.post("/api", formData).catch((err) => { 
            console.log("Error: ", err)});

        if(response) getLatestUser();
    };


    // formats the input to proper format for inserting into database
    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,        
        })
    };

    // used to refresh signup page to take out whats writting already
    const getLatestUser = async () => {
        const response = await axios.get("/api").catch((err) => console.log("Error: ". err))
        if(response && response.data) setUser(response.data);
          };

    useEffect(() => {
        getLatestUser();
    }, []);
    
      

     
    return (
        <div className="login-form">
            <h1 className="font-weight-bold text-center">Sign Up</h1>
            <Form onSubmit={addUser} >
                <FormGroup >
                    <Label>Username</Label>
                    <Input type='text' name="username" placeholder='Username' required onChange={handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' name="email" placeholder='Email' required onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label>Password</Label>
                    <Input type='password' name="password" placeholder='Password' required onChange={handleChange}/>
                    {/* <Input className="mt-3 mb-3" type='password' name=""placeholder='Confirm'/> */}
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block">Sign Up</Button>
                <div className="text-center">
                <p>Or <a href="/login">Log In</a> here please!</p>
                </div>
            </Form>
            <div>
                You are submitting the following:
                <ul>
                {Object.entries(formData).map(([name, value]) => (
                    <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                ))}
                </ul>
            </div>
        </div>
    );
};
