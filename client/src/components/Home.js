import React, { useEffect } from 'react'
import { useState } from 'react';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', // Make it large by using the full viewport height
};


const Home = () => {
  const [username,setUsername]=useState('');

  const showUser=async()=>{
      const res=await fetch("/getData",{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      },
  });
   const data=await res.json();
   setUsername(data.name);
  }

  useEffect(()=>{
           showUser();
  },[]);

  return (
    <>
     <div style={containerStyle}>
      <h1>Welcome</h1>
      <p>hey <span style={{ fontWeight: 'bold' }}>{username}</span> WebDeveloper good to see you here</p>
    </div>
    </>
  )
}

export default Home
