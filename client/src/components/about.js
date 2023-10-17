import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const About = () => {
    const [user,setUser]=useState({});    //state for user data

    const navigate = useNavigate();

    const callAboutpage=async()=>{
        try{
             const res=await fetch('/about',{
                method:'GET',
                headers:{
                    Accept:"application/json",          
                    "Content-Type":"application/json"
                },
                credentials:"include"
             })

             const data=await res.json();
             console.log(data.name);
             setUser(data);
        }
        catch(e)
        {
            navigate('/login')
        }
    }


    useEffect(()=>{
        callAboutpage();
    },[])


  return (
    <>
        <form method='GET'>
            <div>
                <h1>This is secret info</h1>
                <h2>Name:{user.name}</h2>
                <h2>Phone:{user.phone}</h2>
                <h2>Email:{user.email}</h2>
            </div>
        </form>
    </>
  )
}

export default About;
