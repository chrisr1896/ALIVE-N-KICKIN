import React, { useState, useEffect, useReducer } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../App.css'

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

export const SignUp = () => {
    const [user, setUser] = useState([]);
    const [formData, setFormData] = useReducer(formReducer, {});

       useEffect(() => {
        fetch('/api').then(response =>{
            if(response.ok){
                return response.json()
            }
        }).then(data => setUser(data))
    },[]);



    const handleChange = (event) => {
        setFormData({
            name: event.target.name,
            value: event.target.value,        
        })
    };
    

    const handleSubmit = (event) => {
        event.preventDefault(
            handleFormSubmit()
        )
        console.log(formData)
    };

    const getLatestUser = () => {
        fetch('/api').then(response => {
          if(response.ok){
            return response.json()
          }
        }).then(data => setUser(data))
      };


    const handleFormSubmit = () => {
        // let {username, email_address, password}=this.state;
       fetch('/api', {
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
             formData,
        
          })
        }).then(response => response.json()).then(response => {
          setFormData("")
          getLatestUser()
        } );
        alert("You have Submitted the Form")
      };
  
     
    return (
        <div className="login-form">
            <h1 className="font-weight-bold text-center">Sign Up</h1>
            <Form onSubmit={handleSubmit} >
                <FormGroup >
                    <Label>Username</Label>
                    <Input type='text' name="username" placeholder='Username' required onChange={handleChange} step="1"/>
                </FormGroup>
                <FormGroup>
                    <Label>Email</Label>
                    <Input type='email' name="email" placeholder='Email' required onChange={handleChange} step="2"/>
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
// {user.map(users => <p key="users.id">{users.username} {users.email} {users.password}</p>)}


// value={userInput}