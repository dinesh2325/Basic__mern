import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from "react-router-dom";        //so pages not refresh while loading
import { UserContext } from '../App';
import { useContext } from 'react';

const Navbar = () => {
   const {state,dispatch}=useContext(UserContext);
   const RenderMenu=()=>{
        if(state)
        {
          return(
            <>
              <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/about">About</NavLink>
            </li>
      
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/logout">Logout</NavLink>
            </li>
            </>
          )
        }
        else{
          return(
            <>
               <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/about">About</NavLink>
            </li>
           
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/signin">Signin</NavLink>
            </li>
            </>
          )
        }
   }
    return (
        <>
           <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">BRAND</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          <ul className="navbar-nav ms-auto"> {/* Apply ms-auto to align content to the right */}
              <RenderMenu/>        {/*this function is on the top */}
          </ul>
        </div>
      </div>
    </nav>
        </>
    )
}

export default Navbar
