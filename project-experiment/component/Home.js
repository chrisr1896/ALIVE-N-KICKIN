import React, { useState, useEffect } from 'react';
import { axios } from './axios';


export const Home = () => {
    const [users, setUsers] = useState([]);

    console.log("Users:", users)

    const getUser = async () => {
        const response = await axios.get("/api").catch((err) => console.log("Error:", err))
console.log("Response: ", response)

        if(response && response.data)
        setUsers(response.data)
    };

    useEffect(() => {
        getUser();
    }, []);

    return(
        <div>
            {users.map(user => <p key={user.id}>{user.username}-- {user.password}-- {user.email}-- {user.date_created} </p>)}
            <p>I am here1</p>
            <p>zorion</p>
        </div>
    )

};

