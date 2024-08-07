import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import './App.css';
import Nav from "./Navigate.js";
import Home from "./Home.js";
import Login from './Login.js';
import Groceries from './Groceries.js';
import { useEffect, useState } from 'react';


function App() {
    const [user, setUser] = useState(null);
    
    useEffect(() =>{
      const getUser = () => {setUser(sessionStorage.getItem("user"))};
    getUser();
  }, []);
    return (
        <div>
            <Router>
                <Nav  user={user}/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route 
                        path="/home"
                        element={<Home />} />
                    <Route 
                        path="/login"
                        element={user ? <Navigate to="/" /> : <Login />}
                    />
                     <Route 
                        path="/groceries"
                        element={user ? <Groceries /> : <Navigate to="/login" />}
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
