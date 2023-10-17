import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react';
import { UserContext } from '../App';


const Logout = () => {
  const {state,dispatch}=useContext(UserContext);  


  const navigate=useNavigate();

  const LogOut=async()=>{
        const res=await fetch("/logout",{
            method:"GET",
            headers:{
              "Content-Type":"application/json"
            }
        });   
        if(res.status!=200)
        {
            throw new Error('Logout Failed')
        }
        else 
        {
            dispatch({type:"USER",payload:false})
            navigate('/login')
        }
  }
  useEffect(()=>{
     LogOut();
  },[])  

  return (
    <div>
        <h2>this is out logout page</h2>
    </div>
  )
}

export default Logout
