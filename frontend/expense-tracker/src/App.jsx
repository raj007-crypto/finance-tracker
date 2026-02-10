import React from 'react'
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
}from "react-router-dom";
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Home from './pages/Dashboard/Home';
import Expense from './pages/Dashboard/Expense';
import Income from './pages/Dashboard/Income';
import UserProvider from './context/userContext';

const App=()=>{
  return (
  <UserProvider>
  <div>
    <Router>
      <Routes>
        <Route path="/" elements={<Root />}/>
        <Route path="/login" exact element={<Login />}/>
         <Route path="/signup" exact element={<Signup/>}/>
         <Route path="/dashboard" exact element={<Home/>}/>
         <Route path="/income" exact element={<Income/>}/>
         <Route path="/expense" exact element={<Expense/>}/>

      </Routes>
    </Router>
  </div>
  </UserProvider>

  )
  
}
export default App
const Root = () => {
  //if token exists in localStorage
  const isAuthenticated=!!localStorage.getItem("token");
  //Return to dashboard if authenticated, otherwise to login
  return isAuthenticated? (
    <Navigate to= "/dashboard" />
  ):(
    <Navigate to="/login" />
  );
};