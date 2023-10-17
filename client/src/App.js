import './App.css';
import Navbar from './components/navbar';
import Home from './components/Home'
import Login from './components/login';
import Signin from './components/signin';
import About from './components/about';
import Logout from './components/logout';
import { createContext, useReducer } from 'react';


import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";
import { initialState,reducer } from './reducer/UseReducer';

//for logout/login toggle 
export const UserContext = createContext();

function App() {
  //contexApi for using a state throughout some component
  
 const [state,dispatch]=useReducer(reducer,initialState); 

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{state,dispatch}}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/about" element={<About />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>

    </>
  );
}

export default App;



//state is changed by dispatch and when dispatch used it calls to the
//reducer //state ==initialState in starting 