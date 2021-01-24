import React, { Component, useEffect, useState } from 'react';
// import axios from 'react-axios';
import axios from 'axios';
import { Login } from './component/loginPage';
import { SignUp } from './component/signUp';
import { Layout } from './component/Layout';
import { NavBar } from './component/NavBar';
import { Jumbotron } from './component/Jumbotron';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// const api = axios.create({
//   baseURL: `http://127.0.0.1:5000`
// });

function App () {
  const [addUser, setAddUser]= useState('')
  const [user, setUser] = useState([])

  const user1 = user[1] 

    // state = {
    //   users: []
    // };

    // constructor(){
    //   super()
    //   api.get('/').then(res => {
    //     console.log(res.data)
    //     this.setState({ users: res.data })
    //   })
    // };

    // useEffect(() => {
    //     fetch('/api').then(response =>{
    //         if(response.ok){
    //             return response.json()
    //         }
    //     }).then(data => setUser(data))
    // },[]);


    


    const getLatestUser = () => {
      fetch('/api').then(response => {
        if(response.ok){
          return response.json()
        }
      }).then(data => setUser(data))
    };


    const handleFormSubmit = () => {
      // let {username, email_address, password}=this.state;
      fetch('/api/create', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          content: addUser

        })
      }).then(response => response.json()).then(message => {
        setAddUser('')
        getLatestUser()
      } );
    };

  
  return (
    <div className="App"> 
    {/* <p>{user.map(users => <h1 key="users.id" >{users.username}::--- {users.email}--- {users.password}</h1>)}</p>      */}
      <NavBar />
      <Jumbotron />
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </Layout> 
    </div>
  );
  }


export default App;
 /* userInput={setAddUser} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} */
  {/* {this.state.users.map(user => <h2 key={user.id}>{user.username}</h2>)} */}
  // userInput={setAddUser}
  
  