import React, { useState, useEffect } from 'react';
import { Login } from './component/loginPage';
import { SignUp } from './component/signUp';
import { Layout } from './component/Layout';
import { NavBar } from './component/NavBar';
import { Jumbotron } from './component/Jumbotron';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';


function App() {
    const [addUser, setAddUser]= useState("")
    const [user, setUser]= useState([])

    useEffect(() => {
        fetch('/').then(response =>{
            if(response.ok){
                return response.json()
            }
        }).then(data => setUser(data))
    },[]);


    const handleFormChange = (inputValue) => {
      setAddUser(inputValue)
    };


    const getLatestUser = () => {
      fetch('/').then(response => {
        if(response.ok){
          return response.json()
        }
      }).then(data => setUser(data))
    };


    const handleFormSubmit = () => {
      let {username, email_address, password}=this.state;
      fetch('/api/signup', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: username,
          email_address: email_address,
          password: password          

        })
      }).then(response => response.json()).then(message => {
        setAddUser('')
        getLatestUser()
      } );
    };


  return (
    <div className="App">
      <NavBar />
      <Jumbotron />
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path="/signup" component={SignUp} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} /> 
          </Switch>
        </Router>
      </Layout>
    </div>
  );
}

export default App;
 /* userInput={setAddUser} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} */
